const { Post, Comment } = require("../models");

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
//
async function getPosts() {
  try {
    const posts = await Post.findAll();
    return posts.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting posts");
  }
}

async function getPostsComments() {
  try {
    const posts = await Post.findAll({
      include: [Comment],
    });
    return posts.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting posts with comments");
  }
}

async function getPostByID(id) {
  try {
    await checkPost(id);
    const post = await Post.findByPk(id);
    return post.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("post had an error being found");
  }
}

async function getPostCommentsByID(id) {
  try {
    await checkPost(id);
    const post = await Post.findByPk(id, {
      include: [Comment],
    });
    return post.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting a post that may have comments");
  }
}

async function createPost(body) {
  try {
    const post = await Post.create({
      post_name: body.post_name,
      created_on: body.created_on,
      due_by: body.due_by,
      car_id: body.car_id,
    });
    return post.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("post had an error being created");
  }
}

async function updatePost(id, body) {
  try {
    let post = await checkPost(id);
    await post.update({
      post_name: body.post_name,
      created_on: body.created_on,
      due_by: body.due_by,
      car_id: body.car_id,
    });
    post = await checkPost(id);
    return post.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("post had an error updating");
  }
}

async function deletePost(id) {
  try {
    const post = await checkPost(id);
    await post.destroy();
    console.log("deleted post");
    return post.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("post had an error being deleted");
  }
}

async function deleteBulkPost(ids) {
  try {
    const posts = await Post.destroy({ where: { id: ids } });
    return posts.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("posts had an error being deleted");
  }
}

module.exports = {
  checkPost,
  getPosts,
  getPostsComments,
  getPostByID,
  getPostCommentsByID,
  createPost,
  updatePost,
  deletePost,
  deleteBulkPost,
};
