const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validateLogin(req, _res, next) {
  try {
    const { email, password } = req.body;
    const { error } = schema.validate({ email, password });
    if (error) throw error;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validateLogin;
