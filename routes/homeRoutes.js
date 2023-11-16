const router = require('express').Router();


router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.render(req.session.lastView, { message: req.session.lastMessage, loggedIn: req.session.loggedIn });
    return;
  }
  console.log('not logged in ***************************');

  res.render('login');
});


module.exports = router;