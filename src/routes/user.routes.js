const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const validateUser = require('../middlewares/validateUser');

userRouter.get('/', userController.index);

userRouter.post('/', validateUser, userController.register);

module.exports = userRouter;
