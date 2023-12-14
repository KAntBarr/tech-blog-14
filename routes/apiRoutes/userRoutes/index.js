const router = require('express').Router();
const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
} = require('../../../controllers/userController');

router.route('/').post(createUser);

router.route('/:userId').put(updateUser).delete(deleteUser);

router.route('/login').post(loginUser);

router.route('/logout').post(logoutUser);

module.exports = router;