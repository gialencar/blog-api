const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');

userRouter.get('/', userController.index);

module.exports = userRouter;
