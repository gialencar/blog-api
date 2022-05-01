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

async function getUser(req, res) {
  const { id } = req.params;

  const user = await userService.findById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  res.status(200).json(user);
}

async function deleteUser(req, res) {
  const { authorization } = req.headers;

  await userService.deleteUser(authorization.split(' ')[1] || authorization);

  res.status(204).end();
}

module.exports = {
  index,
  register,
  getUser,
  deleteUser,
};
