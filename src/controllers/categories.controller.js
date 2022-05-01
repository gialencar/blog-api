const { categoryService } = require('../services');

async function registerCategory(req, res) {
  const { name } = req.body;

  const category = await categoryService.addCategory({ name });

  res.status(201).json(category);
}

module.exports = {
  registerCategory,
};
