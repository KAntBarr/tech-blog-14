const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const {
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  loginUser,
} = require('../../../controllers/userController');

router.route('/').post(createUser);

router.route('/:userId').put(withAuth, updateUser).delete(withAuth, deleteUser);
router.route('/:userId/password').put(withAuth, updateUserPassword);

router.route('/login').post(loginUser);

// router.route('/logout').get(withAuth, logoutUser);

module.exports = router;