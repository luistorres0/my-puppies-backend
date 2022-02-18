const users = [];

const bcrypt = require("bcrypt");

async function create(req, res, next) {
  const { email, password } = req.body.data;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email,
    password: hashedPassword,
  };

  users.push(user);

  console.log(users);
  res.sendStatus(201);
}

async function authenticate(req, res, next) {
  const { email, password } = req.body.data;

  const foundUser = users.find((user) => user.email === email);

  if (!foundUser) {
    return next({ status: 404, message: "User not found" });
  }

  if (!await bcrypt.compare(password, foundUser.password)) {
    return next({ status: 400, message: "Invalid password" });
  }

  res.json({ data: "Authenticated" });
}

module.exports = {
  create: [create],
  authenticate: [authenticate],
};
