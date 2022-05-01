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

async function register(req, res) {
  const { displayName, email, password, image } = req.body;

  const token = await userService.register({ displayName, email, password, image });

  if (!token) {
    return res.status(409).json({ message: 'User already registered' });
  }

  res.status(201).json({ token });
}

module.exports = {
  index,
  register,
};
