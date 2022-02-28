const router = require("express").Router();
const controller = require("./puppies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.listAllPuppies).all(methodNotAllowed);

module.exports = router;
