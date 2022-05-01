const { categoryService } = require('../services');

async function registerCategory(req, res) {
  const { name } = req.body;

  const category = await categoryService.addCategory({ name });

  res.status(201).json(category);
}

async function getCategories(_req, res) {
  const categories = await categoryService.index();

  res.status(200).json(categories);
}

module.exports = {
  registerCategory,
  getCategories,
};
