const jwt = require("jsonwebtoken");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function checkAuthentication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next({ status: 400, message: "Missing token. Authentication failed" });
  }

  const decodedToken = jwt.verify(token, "open_sesame_seed");
  res.locals.userEmail = decodedToken.email;
  next();
}

module.exports = asyncErrorBoundary(checkAuthentication);
