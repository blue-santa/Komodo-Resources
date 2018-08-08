const express = require('express');
const router = express.Router();

const thirdTopicController = require('../controllers/thirdTopicController');

router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/new', thirdTopicController.new);

module.exports = router;
