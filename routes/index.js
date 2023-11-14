const router = require('express').Router();

const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    res.render('home', { test: 'hi there'});
})

module.exports = router;
