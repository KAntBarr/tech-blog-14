const { User, Comment, Post } = require("../models");

async function checkUser(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("user does not exist");
    }
    return user;
  } catch (error) {
    // console.log(error);
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
      throw new Error("user with email does not exist");
    }
    return user;
  } catch (error) {
    // console.log(error);
    throw Error(error);
  }
}

async function createUser(req, res) {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.userID = user.id;
      req.session.username = user.username;
      console.log(
        'File: user-routes.js ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      // req.session.lastView = 'home';
      // req.session.lastMessage = 'You are now logged in!';
      // req.session.failedSignUp = false;
      // req.session.failedLogin = false;

      res.status(200).json(user);
    });
  } catch (error) {
    // req.session.lastView = 'login';
    // req.session.failedSignUp = true;
    // req.session.failedLogin = false;
    console.log(error);
    res.status(500).json({error: `${error}`});
  }
}

async function updateUser(req, res) {
  try {
    const user = await checkUser(req.params.userId);
    user.username = req.body.username;
    user.email = req.body.email;
    await user.save();
    // await user.update({
    //   username: body.username,
    //   email: body.email,
    // });
    // user = await checkUser(req.params.userId);
    // return user.get({ plain: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: `${error}`});
  }
}

async function updateUserPassword(req, res) {
  try {
    const user = await checkUser(req.params.userId);
    user.password = req.body.password;
    await user.save();
    // return user.get({ plain: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: `${error}`});
  }
}

async function deleteUser(req, res) {
  try {
    const user = await checkUser(req.params.userId);
    await user.destroy();
    // console.log("deleted user");
    // return user.get({ plain: true });
    // res.status(200).json(user);
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({error: `${error}`});
  }
}

async function loginUser(req, res) {
  try {
    const user = await checkUserByEmail(req.body.email);

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      throw new Error("Incorrect email or password");
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.userID = user.id;
      req.session.username = user.username;
      console.log(
        'File: user-routes.js ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );
      res.status(200).json({error: `${error}`});
    });
  } catch (error) {
    // req.session.failedSignUp = false;
    // req.session.failedLogin = true;
    console.log(error);
    // res.status(500).json({error});
    res.status(500).json({error: `${error}`});
  }
}

module.exports = {
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  loginUser,
}