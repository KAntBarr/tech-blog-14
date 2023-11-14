const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home', { test: 'hi there'});
});


module.exports = router;