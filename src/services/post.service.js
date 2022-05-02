const { Sequelize, sequelize } = require('../models');
const { BlogPost } = require('../models');
const userService = require('./user.service');
const categoryService = require('./category.service');

async function createPost({ title, content, categoryIds, token }) {
  // descobrir id do usuário
  const { id: userId } = await userService.findByToken(token);

  // verifica se todas categorias existem
  const { allCategoriesExist, rows } = await categoryService.verifyCategoriesExist(categoryIds);
  if (!allCategoriesExist) return { error: { message: '"categoryIds" not found' } };

  const result = await sequelize.transaction(async (tr) => {
    // criar post
    const post = await BlogPost.create(
      {
        title,
        content,
        userId,
        published: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      { transaction: tr },
    );
    // add categorias
    await post.addCategory(rows, { through: 'categories', transaction: tr });

    return { post: { id: post.id, userId: 1, title, content } };
  });
  return result;
}

module.exports = {
  createPost,
};
