const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  // if (req.session.logged_in) {
  //   res.render(req.session.lastView, { message: req.session.lastMessage, logged_in: req.session.logged_in });
  // }
  // console.log('not logged in ***************************');

  // const loginObj = {
  //   message: req.session.lastMessage,
  //   isLogin: false,
  //   failedLogin: req.session.failedLogin ,
  //   failedSignUp: req.session.failedSignUp
  // }


  // res.render('login', loginObj);



  res.render('home', { message: 'Welcome Home Mr. Stark' });
});

router.get('/dashboard', withAuth, (req, res) => {
  try {
    res.render('dashboard');
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res) => {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: true,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
});

router.get('/signup', async (req, res) => {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: false,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
})

module.exports = router;