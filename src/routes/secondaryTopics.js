const express = require('express');
const router = express.Router();

const secondaryTopicController = require('../controllers/secondaryTopicController');

router.get('/primaryTopics/:primaryTopicId/secondaryTopics/new', secondaryTopicController.new);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:id', secondaryTopicController.show);
router.get('/primaryTopics/:primaryTopicId/secondaryTopics/:id/edit', secondaryTopicController.edit);

router.post('/primaryTopics/:primaryTopicId/secondaryTopics/create', secondaryTopicController.create);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:id/update', secondaryTopicController.update);
router.post('/primaryTopics/:primaryTopicId/secondaryTopics/:id/destroy', secondaryTopicController.destroy);

module.exports = router;
