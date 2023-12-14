const router = require('express').Router();
const {
  createComment,
  updateComment,
  deleteComment,
} = require('../../../controllers/commentController');

router.route('/').post(createComment);

router.route('/:commentId').put(updateComment).delete(deleteComment);

module.exports = router;