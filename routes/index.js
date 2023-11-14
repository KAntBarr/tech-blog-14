const router = require('express').Router();

const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/api', apiRoutes);

router.get('/', homeRoutes)

module.exports = router;
