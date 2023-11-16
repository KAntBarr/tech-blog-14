const router = require('express').Router();


router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.render(req.session.lastView, { message: req.session.lastMessage, loggedIn: req.session.loggedIn });
  }
  console.log('not logged in ***************************');
  
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: false,
    failedLogin: req.session.failedLogin ,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
});

module.exports = router;