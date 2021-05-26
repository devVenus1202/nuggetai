const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/admin');

const requireAuth = passport.authenticate('jwt', { session: false });

const requireAdmin = (req, res, next) => {
  if (req.user.email === 'admin@admin.com') {
    next();
  } else {
    res.status(400).json({
      success: false,
      msg: 'request failed',
    });
  }
};

const adminMiddleware = [requireAuth, requireAdmin];

router.get('/users', controller.getAllUsers);
router.get('/:user_id/challenges', controller.getUserChallenges);
router.get('/:challenge_id/pipelines', controller.getPipelines);

router.get('/waston_csv/:event_id/:waston_type', controller.getWastonCSV);

module.exports = router;
