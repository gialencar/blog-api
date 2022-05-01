/* eslint-disable max-lines-per-function */
/* eslint-disable comma-dangle */
const { Sequelize, sequelize } = require('../models');
const logger = require('../logger');
const { BlogPost, Category, User } = require('../models');
const { decodeToken } = require('./login.service');

async function createPost({ title, content, categoryIds, token }) {
  const result = {};
  // descobrir id do usuário
  const { email } = decodeToken(token);
  const { id: userId } = await User.findOne({ where: { email } });

  const { rows, count } = await Category.findAndCountAll({ where: { id: categoryIds } });
  if (count !== categoryIds.length) {
    result.error = { message: '"categoryIds" not found' };
  }

  const tr = await sequelize.transaction();
  try {
    // criar post
    const post = await BlogPost.create(
      {
        title,
        content,
        userId,
        published: Sequelize.literal('CURRENT_TIMESTAMP'),
        updated: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      { transaction: tr }
    );

    await post.addCategory(rows, { through: 'categories', transaction: tr });

    await tr.commit();

    result.post = { id: post.id, userId: 1, title, content };
  } catch (error) {
    logger.error(error);
    await tr.rollback();
  }

  return result;
}

module.exports = {
  createPost,
};
