const loginRouter = require('express').Router();
const validateLogin = require('../middlewares/validateLogin');
const loginController = require('../controllers/login.controller');

loginRouter.post('/', validateLogin, loginController);

module.exports = loginRouter;
