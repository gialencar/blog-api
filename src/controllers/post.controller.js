const { postService } = require('../services');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1] || authorization;

  const { post, error } = await postService.createPost({
    title,
    content,
    categoryIds,
    token,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.status(201).json(post);
}

module.exports = {
  createPost,
};
