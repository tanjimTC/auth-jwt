const router = require("express").Router();
const { validateBody, schemas } = require("../helpers/rouerHelper");
const userController = require("../controllers/user");

router
  .route("/register")
  .post(validateBody(schemas.userSchema), userController.newUser);

module.exports = router;
