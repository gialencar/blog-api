const { Category } = require('../models');

async function addCategory({ name: categoryName }) {
  const { id, name } = await Category.create({ name: categoryName });

  return { id, name };
}

async function index() {
  const categories = await Category.findAll();

  return categories;
}

module.exports = {
  addCategory,
  index,
};
