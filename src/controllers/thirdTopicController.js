const thirdTopicQueries = require('../db/queries.thirdTopics.js');

module.exports = {

  new(req, res, next) {
    res.render('thirdTopics/new', { primaryTopicId: req.params.primaryTopicId, secondaryTopicId: req.params.secondaryTopicId })
  },

  create(req, res, next) {
    let newThirdTopic = {
      title: req.body.title,
      content: req.body.content,
      primaryTopicId: req.params.primaryTopicId,
      secondaryTopicId: req.params.secondaryTopicId
    };
    thirdTopicQueries.addThirdTopic(newThirdTopic, (err, thirdTopic) => {
      if (err) {
        res.redirect(500, '/thirdTopics/new');
      } else {
        res.redirect(303, `/primaryTopics/${thirdTopic.primaryTopicId}/secondaryTopics/${thirdTopic.secondaryTopicId}/thirdTopics/${thirdTopic.id}`);
      }
    });
  }

}
