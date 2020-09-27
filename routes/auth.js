const router = require("express").Router();
const {
  validateBody,
  validateUserLogin,
  schemas,
} = require("../helpers/rouerHelper");
const userController = require("../controllers/user");

router
  .route("/register")
  .post(validateBody(schemas.userSchema), userController.newUser);

router.route("/login").post(validateUserLogin(schemas.loginSchema));

module.exports = router;
