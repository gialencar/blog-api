const postRouter = require('express').Router();
const validateAuthorization = require('../middlewares/validateAuthorization');
const validatePost = require('../middlewares/validatePost');
const postController = require('../controllers/post.controller');
const validatePostOwnership = require('../middlewares/validatePostOwnership');

postRouter.post('/', validateAuthorization, validatePost, postController.createPost);

postRouter.get('/', validateAuthorization, postController.getAll);

postRouter.get('/:id', validateAuthorization, postController.getPostById);

postRouter.delete('/:id', validateAuthorization, validatePostOwnership, postController.deletePost);

module.exports = postRouter;
