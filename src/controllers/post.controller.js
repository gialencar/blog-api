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

async function deletePost(req, res) {
  const { id } = req.params;

  await postService.deletePostById(id);

  res.status(204).end();
}

async function editPost(req, res) {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;

  if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const post = await postService.editPost({ id, title, content });

  res.status(200).json(post);
}

async function searchPost(req, res) {
  const { q } = req.query;

  const posts = await postService.search(q);
  // logger.info(posts);
  res.status(200).json(posts);
}

module.exports = {
  createPost,
  getAll,
  getPostById,
  deletePost,
  editPost,
  searchPost,
};
