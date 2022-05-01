const logger = require('../logger');
const { loginService } = require('../services');

function validateAuthorization(req, res, next) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = authorization.split(' ')[1] || authorization;
    loginService.validateToken(token);
    next();
  } catch (error) {
    logger.warn(error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}

module.exports = validateAuthorization;
