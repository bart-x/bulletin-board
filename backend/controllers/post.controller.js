const Post = require('../models/post.model');
const validateData = require('../utils/validatePost.js');

exports.loadAll = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'Published' });
    if (!posts) res.status(404).json({ post: 'Not Found' });
    else res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loadPostById = async (req, res) => {
  try {
    console.log(req.params);
    const post = await Post.find({ _id: req.params.id });
    if (!post) res.status(404).json({ post: 'Not Found' });
    else res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loadByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const posts = await Post.find({ user: user });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addPost = async (req, res) => {
  const { title, description, email } = req.fields;
  try {
    let fileName;
    if (!req.files.image) fileName = null;
    else fileName = req.files.image.path.split('/').slice(-1)[0];

    if (validateData(title, description, email, fileName)) {
      const newPost = new Post({ ...req.fields, image: fileName });
      await newPost.save();
      res.json(newPost);
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.editPost = async (req, res) => {
  try {
    const { title, description, email, location, price, phone, updated } = req.fields;

    let fileName;
    if (!req.files.image) fileName = null;
    else fileName = req.files.image.path.split('/').slice(-1)[0];

    const post = await Post.findOne({ _id: req.params.id });

    if (!validateData(title, description, email, fileName)) throw new Error('Wrong input!');
    else if (!post) res.status(404).json({ post: 'Not Found' });
    else {
      post.title = title;
      post.description = description;
      post.email = email;
      post.location = location;
      post.price = price;
      post.phone = phone;
      post.updated = updated;
      post.image = fileName;
      await post.save();
      res.json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
