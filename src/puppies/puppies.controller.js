const checkAuthentication = require("../common/checkAuthentication");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function listAllPuppies(req, res, next) {
  const email = res.locals.userEmail;
  res.json({
    data: {
      email,
      message: "retrieved puppies",
    },
  });
}

module.exports = {
  listAllPuppies: [checkAuthentication, asyncErrorBoundary(listAllPuppies)],
};
