const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/authenticate").post(controller.authenticate).all(methodNotAllowed);
router.route("/").post(controller.create).all(methodNotAllowed);

module.exports = router;
