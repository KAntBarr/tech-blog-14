const router = require('express').Router();


router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.render('home', { test: "tetete" });
        return;
      }
      console.log('not logged in ***************************');
      
      res.render('login');
});


module.exports = router;