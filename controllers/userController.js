const { User, Comment, Post } = require("../models");

async function checkUser(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("user does not exist");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

async function checkUserByEmail(email) {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new Error("user does not exist");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

async function getUsers() {
  // admin privileges
  try {
    const users = await User.findAll();
    return users.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting users");
  }
}

async function getUsersPosts() {
  try {
    const users = await User.findAll({
      include: [Post],
    });
    return users.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting users and posts");
  }
}

async function getUsersAll() {
  try {
    const users = await User.findAll({
      include: [Comment, Post],
    });
    return users.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting users, comments, and posts");
  }
}

async function getUserByID(id) {
  try {
    await checkUser(id);
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("user had an error being found");
  }
}

async function getUserPostsByID(id) {
  try {
    await checkUser(id);
    const user = await User.findByPk(id, {
      include: [Post],
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("user with posts had an error being found");
  }
}

async function getUserAllByID(id) {
  try {
    await checkUser(id);
    const user = await User.findByPk(id, {
      include: [Comment, Post],
    });
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(
      "user with posts and comments had an error being found"
    );
  }
}

async function createUser(body) {
  try {
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
    });
    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("user had an error being created");
  }
}

async function updateUser(id, body) {
  try {
    let user = await checkUser(id);
    await user.update({
      username: body.username,
      email: body.email,
    });
    user = await checkUser(id);
    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("user had an error updating");
  }
}

async function updateUserPassword(id, body) {
  try {
    let user = await checkUser(id);
    await user.update({
      password: body.password,
    });
    user = await checkUser(id);
    return user.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("user had an error updating password");
  }
}

async function deleteUser(id) {
  try {
    const user = await checkUser(id);
    await user.destroy();
    console.log("deleted user");
  } catch (error) {
    console.log(error);
    throw new Error("user had an error being deleted");
  }
}

// async function deleteBulkUser(id) {
//     try {

//     } catch (error) {

//     }
// }

module.exports = {
  checkUser,
  checkUserByEmail,
  getUsers,
  getUsersPosts,
  getUsersAll,
  getUserByID,
  getUserPostsByID,
  getUserAllByID,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  // deleteBulkUser
};
