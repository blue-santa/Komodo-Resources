const express = require('express');
const router = express.Router();

const fourthTopicController = require('../controllers/fourthTopicController');

router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/new', fourthTopicController.new);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id', fourthTopicController.show);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id/edit', fourthTopicController.edit);

router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/create', fourthTopicController.create);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id/update', fourthTopicController.update);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id/destroy', fourthTopicController.destroy);
module.exports = router;
