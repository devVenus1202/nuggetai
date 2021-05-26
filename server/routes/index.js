const express = require('express');
const router = express.Router();
const adminRouter = require('./admin');
const authRouter = require('./auth');
const challengeRouter = require('./challenge');
const eventRouter = require('./event');

const passportService = require('../config/passport');

router.get('/', function(req, res) {
  res.json({ success: true, title: 'NuggetAI REST API Interface' });
});

router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/challenge', challengeRouter);
router.use('/event', eventRouter);

module.exports = router;
