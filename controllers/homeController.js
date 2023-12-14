const { User, Comment, Post } = require("../models");

async function showHome(req, res) {
  res.render('home', { message: 'Welcome Home Mr. Stark' });
}

async function showDashboard(req, res) {
  res.render('dashboard');
}

async function showProfile(req, res) {
  res.render('profile');
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


module.exports = {
  showHome,
  showDashboard,
  showProfile,
  showLogin,
  showSignup
}