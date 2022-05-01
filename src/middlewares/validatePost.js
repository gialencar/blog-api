const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

function validatePost(req, _res, next) {
  try {
    const { title, content, categoryIds } = req.body;
    const { error } = schema.validate({ title, content, categoryIds });
    if (error) throw error;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = validatePost;
