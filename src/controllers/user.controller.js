const logger = require('../logger');
const { userService, loginService } = require('../services');

async function index(req, res) {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = authorization.split(' ')[1] || authorization;
    loginService.validateToken(token);
  } catch (error) {
    logger.warn(error);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  const users = await userService.index();

  res.status(200).json(users);
}

module.exports = {
  index,
};
