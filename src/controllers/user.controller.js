const { userService } = require('../services');

async function index(_req, res) {
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
