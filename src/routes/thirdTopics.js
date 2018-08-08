const express = require('express');
const router = express.Router();

const thirdTopicController = require('../controllers/thirdTopicController');

router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/new', thirdTopicController.new);

router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/create', thirdTopicController.create);

module.exports = router;
