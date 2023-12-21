const { User, Comment, Post } = require("../models");

async function showHome(req, res) {

  

  res.render('home', {
    logged_in: req.session.logged_in,
    username: req.session.username,
    user_id: req.session.userID
  });
}

async function showDashboard(req, res) {
  res.render('dashboard', {
    logged_in: req.session.logged_in,
  });
}

async function showProfile(req, res) {
  res.render('profile', {
    logged_in: req.session.logged_in,
  });
}

function showLogin(req, res) {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: true,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
}

function showSignup(req, res) {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: false,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
}

async function signOutUser(req, res) {
  req.session.destroy(() => {
    // console.log("---user logged out---");
    res.redirect('/');
    // res.status(200).send("user has been succesfully logged out");
  });
}


module.exports = {
  showHome,
  showDashboard,
  showProfile,
  showLogin,
  showSignup,
  signOutUser
}