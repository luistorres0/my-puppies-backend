const users = [];

function create(req, res, next) {
  const { username, password } = req.body.data;

  const user = {
    username,
    password,
  };
  users.push(user);
  res.sendStatus(201);
}

function authenticate(req, res, next) {
  const { username, password } = req.body.data;

  const foundUser = users.find((user) => user.username === username);

  if (!foundUser) {
    return next({ status: 404, message: "User not found" });
  }

  if (foundUser.password !== password) {
    return next({ status: 400, message: "Invalid password" });
  }

  res.json({ data: "Authenticated" });
}

module.exports = {
  create: [create],
  authenticate: [authenticate],
};
