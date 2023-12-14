const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home', { message: 'Welcome Home Mr. Stark' });
});

router.get('/dashboard', withAuth, (req, res) => {
  res.render('dashboard');
});

router.get('/profile', withAuth, (req, res) => {
  res.render('profile');
})

router.get('/login', (req, res) => {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: true,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
});

router.get('/signup', (req, res) => {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: false,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
})

module.exports = router;