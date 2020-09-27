const User = require("../models/User");

module.exports = {
  newUser: async (req, res, next) => {
    const newUser = new User(req.value.body);
    const user = await newUser.save();
    res.status(201).json(user);
  },
};
