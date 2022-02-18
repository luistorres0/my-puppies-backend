function create(req, res, next) {
  res.json({ data: "Create worked!" });
}

function authenticate(req, res, next) {
  res.json({ data: "Authenticate worked!" });
}

module.exports = {
  create: [create],
  authenticate: [authenticate],
};
