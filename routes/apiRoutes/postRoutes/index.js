const router = require('express').Router();
const {
  createPost,
  updatePost,
  deletePost,
} = require('../../../controllers/postController');

router.route('/').post(createPost);

router.route('/:postId').put(updatePost).delete(deletePost);

module.exports = router;