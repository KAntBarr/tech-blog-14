const { User, Comment, Post } = require("../models");

async function checkComment(id) {
  try {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error("comment does not exist");
    }
    return comment;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

async function createComment(req, res) {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      username: req.body.username,
      post_id: req.body.post_id,
      created_on: req.body.created_on
    });
    // return comment.get({ plain: true });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function updateComment(req, res) {
  try {
    const comment = await checkComment(req.params.commentId);
    comment.content = req.body.content;
    await comment.save();
    // await comment.update({
    //   content: req.body.content,
    //   comment_content: req.body.comment_content,
    // });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await checkComment(req.params.commentId);
    await comment.destroy();
    // console.log("deleted comment");
    // return comment.get({ plain: true });
    res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  createComment,
  updateComment,
  deleteComment,
}