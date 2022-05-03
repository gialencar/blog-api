const { userService, postService } = require('../services');

async function validatePostOwnership(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1] || authorization;
  const user = await userService.findByToken(token);
  const post = await postService.getById(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (user.id !== post.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
}

module.exports = validatePostOwnership;
