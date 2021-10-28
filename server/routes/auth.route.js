const { Router } = require('express');
const passport = require('passport');
const { usersController } = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/auth/check', authMiddleware, usersController.userCheck);

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.CLIENT_CALLBACK_URL + '?failure=1'
  }),
  usersController.authUser
);

router.get('/logout', (req, res) => {
  req.logOut();
  res.status(200).json('you are logged out');
});

module.exports = router;
