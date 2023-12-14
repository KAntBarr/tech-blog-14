const { User, Comment, Post } = require("../models");

async function checkPost(id) {
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      throw new Error("post does not exist");
    }
    return post;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

async function createPost(req, res) {
  try {
    const post = await Post.create({
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.body.user_id,
    });
    // return post.get({ plain: true });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updatePost(req, res) {
  try {
    const post = await checkPost(req.body.postId);
    post.post_title = req.body.post_title;
    post.post_content = req.body.post_content;
    await post.save();
    // await post.update({
    //   post_title: req.body.post_title,
    //   post_content: req.body.post_content,
    // });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deletePost(req, res) {
  try {
    const post = await checkPost(req.body.postId);
    await post.destroy();
    // console.log("deleted post");
    // return post.get({ plain: true });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


module.exports = {
  createPost,
  updatePost,
  deletePost,
}