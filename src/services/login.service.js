const { User } = require('../models');
const { generateToken } = require('../utils/auth.util');

async function authenticate({ email, password }) {
  const user = await User.findOne({ where: { email } });

  if (user && password === user.password) {
    return generateToken({ email });
  }
}

module.exports = {
  authenticate,
};
