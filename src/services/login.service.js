require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

async function generateAccessToken({ email, password }) {
  const user = await User.findOne({ where: { email } });

  if (user && password === user.password) {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1800s' });
  }
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET, {});
}

module.exports = {
  generateAccessToken,
  validateToken,
};
