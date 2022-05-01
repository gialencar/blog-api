const { loginService } = require('../services');

async function loginController(req, res) {
  const { email, password } = req.body;

  const token = await loginService.authenticate({ email, password });

  if (!token) return res.status(400).json({ message: 'Invalid fields' });

  res.status(200).json({ token });
}

module.exports = loginController;
