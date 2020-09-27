const User = require("../models/User");

module.exports = {
  newUser: async (req, res, next) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.hashedPassword,
    });
    const user = await newUser.save();
    // send back only userid to protect data
    res.status(201).json({ user: user._id });
  },
};
