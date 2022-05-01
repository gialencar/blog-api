const { User } = require('../models');

async function index() {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
}

module.exports = {
  index,
};
