const service = require("./users.service");
const bcrypt = require("bcrypt");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const jwt = require("jsonwebtoken");

function isEmailValid(req, res, next) {
  const { email } = req.body.data;
  if (!email.match(/^\S+@\S+$/)) {
    return next({ status: 400, message: "Please provide a valid email." });
  }

  next();
}

async function isEmailAlreadyInUse(req, res, next) {
  const { email } = req.body.data;

  const foundUser = await service.getUserByEmail(email);

  if (foundUser) {
    return next({
      status: 400,
      message: "Email assigned to an account. Please log in to account.",
    });
  }

  next();
}

function isPasswordValid(req, res, next) {
  const { password } = req.body.data;

  if (password.length < 6) {
    return next({
      status: 400,
      message: "Password is invalid. It must contain at least 6 characters.",
    });
  }

  next();
}

async function create(req, res, next) {
  const { email, password } = req.body.data;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email,
    password: hashedPassword,
  };

  await service.create(user);

  const token = jwt.sign({ email: user.email }, "open_sesame_seed", { expiresIn: "1h" });

  res.status(201).json({
    data: {
      email: user.email,
      token,
    },
  });
}

async function authenticate(req, res, next) {
  const { email, password } = req.body.data;

  const foundUser = await service.getUserByEmail(email);

  if (!foundUser) {
    return next({ status: 404, message: "User not found" });
  }

  if (!(await bcrypt.compare(password, foundUser.password))) {
    return next({ status: 400, message: "Invalid password" });
  }

  const token = jwt.sign({ email: foundUser.email }, "open_sesame_seed", { expiresIn: "1h" });

  res.status(201).json({
    data: {
      email: foundUser.email,
      token,
    },
  });
}

module.exports = {
  create: [
    asyncErrorBoundary(isEmailValid),
    asyncErrorBoundary(isEmailAlreadyInUse),
    asyncErrorBoundary(isPasswordValid),
    asyncErrorBoundary(create),
  ],
  authenticate: [
    asyncErrorBoundary(isEmailValid),
    asyncErrorBoundary(isPasswordValid),
    asyncErrorBoundary(authenticate),
  ],
};
