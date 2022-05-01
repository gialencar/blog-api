const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

function validateCategory(req, _res, next) {
  try {
    const { name } = req.body;
    const { error } = schema.validate({ name });
    if (error) throw error;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validateCategory;
