require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1800s' });
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET, {});
}

function decodeToken(token) {
  return jwt.decode(token);
}

async function authenticate({ email, password }) {
  const user = await User.findOne({ where: { email } });

  if (user && password === user.password) {
    return generateToken({ email });
  }
}

module.exports = {
  authenticate,
  validateToken,
  generateToken,
  decodeToken,
};
