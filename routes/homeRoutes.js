const router = require('express').Router();
const withAuth = require('../utils/auth');
const {
  showHome,
  showDashboard,
  showProfile,
  showLogin,
  showSignup,
  signOutUser
} = require('../controllers/homeController');

router.get('/', showHome);

router.get('/dashboard', withAuth, showDashboard);

router.get('/profile', withAuth, showProfile)

router.get('/login', showLogin);

router.get('/signup', showSignup)

router.get('/signout', withAuth, signOutUser)

module.exports = router;