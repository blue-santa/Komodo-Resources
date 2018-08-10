const express = require('express');
const router = express.Router();

const fifthTopicController = require('../controllers/fifthTopicController');

router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/new', fifthTopicController.new);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id', fifthTopicController.show);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id/edit', fifthTopicController.edit);

router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/create', fifthTopicController.create);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id/update', fifthTopicController.update);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id/destroy', fifthTopicController.destroy);

module.exports = router;
