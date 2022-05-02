const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '4h' });
}

function validateToken(token) {
  return jwt.verify(token, JWT_SECRET, {});
}

function decodeToken(token) {
  return jwt.decode(token);
}

module.exports = {
  generateToken,
  validateToken,
  decodeToken,
};
