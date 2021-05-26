const express = require('express');
const router = express.Router();
const controller = require('../controllers/event');

router.post('/:event_id', controller.writeEvent);


module.exports = router;
