const express = require('express');
const passport = require('passport');
const router = express.Router();
const multer = require('multer');
const authController = require('../controllers/auth');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const fileUpload = multer({ dest: 'public/resources/avatars/' }).fields([ { name: 'image', maxCount: 1 } ]);

const uploadFinished = function(req, res, next) {
  next();
};

router.get('/', function(req, res, next) {
  res.json({ success: true, title: 'NuggetAI Auth API Interface' });
});

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
// router.post('/signin', requireLogin, authController.signIn);

router.post('/signout', requireAuth, authController.signOut);
router.get('/user', requireAuth, authController.viewProfile);
//router.get('/user', authController.removeUser);

router.put('/user', [ requireAuth, fileUpload, uploadFinished ], authController.updateUser);
router.delete('/user', requireAuth, authController.removeUser);
router.post('/send-password-reset', authController.sendPasswordReset);
router.post('/change-password', requireAuth, authController.changePassword);
router.post('/validateUser', authController.validateUser);
router.post('/sendverifymailagain', authController.sendVerifyMailAgain);

module.exports = router;
