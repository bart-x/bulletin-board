const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

const posts = require('../controllers/post.controller');

router.get('/posts', posts.loadAll);
router.get('/post/:id', posts.loadPostById);
router.get('/my-posts', posts.loadByUser);
router.post('/posts', posts.addPost);
router.put('/post/:id', posts.editPost);


router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({ status: 'published' })
      .select('author created title photo')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
