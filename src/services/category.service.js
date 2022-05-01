const { Category } = require('../models');

async function addCategory({ name: categoryName }) {
  const { id, name } = await Category.create({ name: categoryName });

  return { id, name };
}

module.exports = {
  addCategory,
};
