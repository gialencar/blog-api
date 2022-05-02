const postRouter = require('express').Router();
const validateAuthorization = require('../middlewares/validateAuthorization');
const validatePost = require('../middlewares/validatePost');
const postController = require('../controllers/post.controller');

postRouter.post('/', validateAuthorization, validatePost, postController.createPost);

postRouter.get('/', validateAuthorization, postController.getAll);

module.exports = postRouter;
