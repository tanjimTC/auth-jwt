const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  validateParam: (schema, name) => {
    return async (req, res, next) => {
      const result = await schema.validate({ params: req["params"][name] });
      if (result.error) {
        // Error happened=
        return res.status(400).json(result.error);
      } else {
        if (!req.value) {
          req.value = {};
        }
        if (!req.value["params"]) {
          req.value["params"] = {};
        }
        req.value["params"][name] = result.value.params;
        next();
      }
    };
  },

  validateBody: (schema) => {
    return async (req, res, next) => {
      // validate the data before creating user
      const result = await schema.validate(req.body);
      if (result.error)
        return res.status(400).send(result.error.details[0].message);

      // check if the user alredy exists
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) return res.status(400).send("Email already exists");

      // hash the password
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

      if (!req.body.hashedPassword) {
        req.body.hashedPassword = hashedPassword;
      }
      next();
    };
  },
  validateUserLogin: (schema) => {
    return async (req, res) => {
      // validate the data before creating user
      const result = await schema.validate(req.body);
      if (result.error)
        return res.status(400).send(result.error.details[0].message);

      // check if the user alredy exists
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Email does't exists");

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("wrong password sucker");

      // create and assign a jwt toekn
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    };
  },

  schemas: {
    idSchema: Joi.object().keys({
      params: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    userSchema: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
    loginSchema: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  },
};
