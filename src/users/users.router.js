const router = require("express").Router();
const controller = require("./users.controller")

router.route("/authenticate").post(controller.authenticate)
router.route("/").post(controller.create);

module.exports = router;
