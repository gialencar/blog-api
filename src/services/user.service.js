const { User } = require('../models');
const { generateToken } = require('./login.service');

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

module.exports = {
  index,
  register,
};
