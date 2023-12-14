const router = require('express').Router();
const userRoutes = require('./userRoutes.js/index.js');
const postRoutes = require('./postRoutes.js/index.js');
const commentRoutes = require('./commentRoutes.js/index.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;