const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../../../controllers/postController');

router.route('/').post(createPost);

router.route('/:postId').get(getPost).put(withAuth, updatePost).delete(withAuth, deletePost);

module.exports = router;