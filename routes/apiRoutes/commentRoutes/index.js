const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const {
  createComment,
  updateComment,
  deleteComment,
} = require('../../../controllers/commentController');

router.route('/').post(withAuth, createComment);

router.route('/:commentId').put(withAuth, updateComment).delete(withAuth, deleteComment);

module.exports = router;