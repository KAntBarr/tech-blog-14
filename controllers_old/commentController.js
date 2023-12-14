const { Comment } = require("../models");

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

async function getComments() {
  try {
    const comments = await Comment.findAll();
    return comments.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting comments");
  }
}

async function getCommentByID(id) {
  try {
    await checkComment(id);
    const comment = await Comment.findByPk(id);
    return comment.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("comment had an error being found");
  }
}

async function getCommentPostByID(id) {
  try {
    await checkComment(id);
    const comment = await Comment.findByPk(id, {
      include: [Post],
    });
    return comment.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("comment had an error being found");
  }
}

async function createComment(body) {
  try {
    const comment = await Comment.create({
      message: body.message,
      task_id: body.task_id,
    });
    return comment.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("comment had an error being created");
  }
}

async function updateComment(id, body) {
  try {
    let comment = await checkComment(id);
    await task.update({
      message: body.message,
      task_id: body.task_id,
    });
    return comment.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("comment had an error being created");
  }
}

async function deleteComment(id) {
  try {
    const comment = await checkComment(id);
    await comment.destroy();
    console.log("deleted comment");
    return comment.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("comment had an error being deleted");
  }
}

async function deleteBulkComment(ids) {
  try {
    const comments = await Comment.destroy({ where: { id: ids } });
    return comments.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("comment had an error being deleted");
  }
}

module.exports = {
  checkComment,
  getComments,
  getCommentByID,
  getCommentPostByID,
  createComment,
  updateComment,
  deleteComment,
  deleteBulkComment,
};
