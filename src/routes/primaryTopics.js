const express = require('express');
const router = express.Router();

const primaryTopicController = require('../controllers/primaryTopicController');

router.get('/primaryTopics', primaryTopicController.index);
router.get('/primaryTopics/new', primaryTopicController.new);
router.get('/primaryTopics/:id', primaryTopicController.show);
router.get('/primaryTopics/:id/edit', primaryTopicController.edit);
router.post('/primaryTopics/create', primaryTopicController.create);
router.post('/primaryTopics/:id/update', primaryTopicController.update);
router.post('/primaryTopics/:id/destroy', primaryTopicController.destroy);

module.exports = router;
