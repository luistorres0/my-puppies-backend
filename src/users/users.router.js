const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/login").post(controller.login).all(methodNotAllowed);
router.route("/:id").delete(controller.delete).all(methodNotAllowed);
router.route("/").post(controller.create).all(methodNotAllowed);

module.exports = router;
