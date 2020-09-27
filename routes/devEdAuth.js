const User = require("../models/User");
const router = require("express").Router();
const { registrationValidate } = require("../helpers/devEd");

router.post("/register", async (req, res) => {
  const { error } = registrationValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    error.status(400).send(error);
  }
});

module.exports = router;
