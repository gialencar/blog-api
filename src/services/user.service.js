const { User } = require('../models');
const { decodeToken, generateToken } = require('../utils/auth.util');

async function index() {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
}

async function register({ displayName, email, password, image }) {
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return;

  await User.create({ displayName, email, password, image });

  const token = generateToken({ email });

  return token;
}

async function findById(id) {
  const user = await User.findByPk(id);

  return user || null;
}

async function deleteUser(token) {
  const { email } = decodeToken(token);

  await User.destroy({ where: { email } });
}

async function findByToken(token) {
  const { email } = decodeToken(token);
  const user = await User.findOne({ where: { email } });
  return user;
}

module.exports = {
  index,
  register,
  findById,
  deleteUser,
  findByToken,
};
