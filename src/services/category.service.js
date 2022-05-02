const { Category } = require('../models');

async function addCategory({ name: categoryName }) {
  const { id, name } = await Category.create({ name: categoryName });

  return { id, name };
}

async function index() {
  const categories = await Category.findAll();

  return categories;
}

async function verifyCategoriesExist(categoryIds) {
  const { rows, count } = await Category.findAndCountAll({ where: { id: categoryIds } });

  return {
    allCategoriesExist: count === categoryIds.length,
    rows,
  };
}

module.exports = {
  addCategory,
  index,
  verifyCategoriesExist,
};
