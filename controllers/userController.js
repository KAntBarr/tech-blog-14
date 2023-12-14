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
      username: body.username,
      email: body.email,
      password: body.password,
    });
    // console.log(user);

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.userId = user.id;
      console.log(
        'File: user-routes.js ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      req.session.lastView = 'home';
      req.session.lastMessage = 'You are now logged in!';
      req.session.failedSignUp = false;
      req.session.failedLogin = false;

      res.status(200).json(user);
    });
  } catch (error) {
    // req.session.lastView = 'login';
    // req.session.failedSignUp = true;
    // req.session.failedLogin = false;
    console.log(error);
    res.status(500).json(error);
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
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await checkUser(req.params.userId);
    await user.destroy();
    // console.log("deleted user");
    // return user.get({ plain: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function loginUser(req, res) {
  try {
    const user = await checkUserByEmail(req.body.email);

    if (!user) {
      req.session.save(() => {
        req.session.lastMessage = "Incorrect email or password, please try again";
        req.session.failedLogin = true;
        res.status(500).send("Incorrect email or password, please try again");
        return;
      })
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      req.session.save(() => {
        req.session.lastMessage = "Incorrect email or password, please try again";
        req.session.failedLogin = true;
        res.status(500).send("Incorrect email or password, please try again");
        return;
      })
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.userID = user.id;
      console.log(
        'File: user-routes.js ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      // req.session.lastView = 'home';

      // req.session.lastMessage = "your in the mainframe!";

      // console.log("---user logged in---");
      res.status(200).json(user);
    });
  } catch (err) {
    // req.session.failedSignUp = false;
    // req.session.failedLogin = true;
    console.log(err);
    res.status(500).json(err);
  }
}

async function logoutUser(req, res) {
  req.session.destroy(() => {
    // console.log("---user logged out---");
    // res.redirect('/');
    res.status(200).send("user has been succesfully logged out");
  });
}

module.exports = {
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  loginUser,
  logoutUser
}