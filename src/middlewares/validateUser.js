const Joi = require('joi');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
  image: Joi.string().uri(),
});

function validateUser(req, _res, next) {
  try {
    const { displayName, email, password, image } = req.body;
    const { error } = schema.validate({ displayName, email, password, image });
    if (error) throw error;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validateUser;
