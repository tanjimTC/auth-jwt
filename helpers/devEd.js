const Joi = require("joi");

const registrationValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = {
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(6).required(),
  };
  return schema.validate(data);
};

module.exports.registrationValidate = registrationValidate;
module.exports.loginValidate = loginValidate;
