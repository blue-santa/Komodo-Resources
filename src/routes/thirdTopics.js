const express = require('express');
const router = express.Router();

const thirdTopicController = require('../controllers/thirdTopicController');

router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/new', thirdTopicController.new);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id', thirdTopicController.show);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id/edit', thirdTopicController.edit);

router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id/update', thirdTopicController.update);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/create', thirdTopicController.create);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id/destroy', thirdTopicController.destroy);

module.exports = router;
