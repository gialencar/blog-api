const { Op } = require('sequelize');
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

async function index() {
  const posts = await BlogPost.findAll({
    include: [
      { association: 'user', attributes: { exclude: 'password' } },
      { association: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
}

async function getById(id) {
  const post = await BlogPost.findByPk(id, {
    include: [
      { association: 'user', attributes: { exclude: 'password' } },
      { association: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
}

async function deletePostById(id) {
  await BlogPost.destroy({
    where: { id },
  });
}

async function editPost({ id, title, content }) {
  await BlogPost.update({ title, content }, { where: { id }, returning: true });
  const post = BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['published', 'updated'] },
    include: [
      {
        association: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return post;
}

async function search(searchTerm) {
  const posts = await BlogPost.findAll({
    where: Sequelize.or(
      { title: { [Op.like]: `%${searchTerm}%` } },
      { content: { [Op.like]: `%${searchTerm}%` } },
    ),
    include: [
      {
        association: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        association: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return posts;
}

module.exports = {
  createPost,
  index,
  getById,
  deletePostById,
  editPost,
  search,
};
