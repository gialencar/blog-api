const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const validateAuthorization = require('../middlewares/validateAuthorization');
const validateUser = require('../middlewares/validateUser');

userRouter.get('/', validateAuthorization, userController.index);

userRouter.post('/', validateUser, userController.register);

userRouter.get('/:id', validateAuthorization, userController.getUser);

userRouter.delete('/me', validateAuthorization, userController.deleteUser);

module.exports = userRouter;
