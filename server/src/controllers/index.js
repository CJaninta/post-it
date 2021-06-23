const Post = require("../models");

exports.getPost = async (req, res, next) => {
  try {
    // sort : id = -1 (newest to oldest.)
    //        id = 1 (oldest to newest)
    const posts = await Post.find().sort({ _id: -1 });
    res.status(200).json({
      message: "Fetched data successfully!",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const data = req.body;
  if (
    data.username.trim() == "" ||
    data.topic.trim() == "" ||
    data.text.trim() == ""
  ) {
    return res.status(400).json({
      message: "Failed to create data!",
    });
  }
  const post = new Post(data);
  try {
    await post.save();
    res.status(201).json({
      message: "Created data successfully!",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const { username, topic, text } = req.body;
  if (username.trim() == "" || topic.trim() == "" || text.trim() == "") {
    return res.status(400).json({
      message: "Failed to update data!",
    });
  }
  const updated = {
    $set: {
      username,
      topic,
      text,
    },
  };
  try {
    await Post.findByIdAndUpdate(postId, updated);
    const newData = await Post.findById(postId);
    res.status(200).json({ message: "Updated post!", newData });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    await Post.findByIdAndRemove(postId);
    res.status(200).json({ message: "Deleted post!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
