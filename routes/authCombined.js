const User = require("../models/User");
const router = require("express").Router();
const { validateBody, schemas } = require("../helpers/rouerHelper");
const { registrationValidate } = require("../helpers/devEd");
const userController = require("../controllers/user");

// router.post("/register", async (req, res) => {
//   const { error } = registrationValidate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = new User(req.body);
//   try {
//     const savedUser = await user.save();
//     res.send(savedUser);
//   } catch (error) {
//     error.status(400).send(error);
//   }
// });

router
  .route("/register")
  .post(validateBody(schemas.userSchema), userController.newUser);

module.exports = router;
