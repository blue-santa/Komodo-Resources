const express = require('express');
const router = express.Router();

const primaryTopicController = require('../controllers/primaryTopicController');

router.get('/primaryTopics', primaryTopicController.index);

module.exports = router;
