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

async function getAll(_req, res) {
  const posts = await postService.index();

  res.status(200).json(posts);
}

async function getPostById(req, res) {
  const { id } = req.params;

  const post = await postService.getById(id);

  if (!post) {
    res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(post);
}

module.exports = {
  createPost,
  getAll,
  getPostById,
};
