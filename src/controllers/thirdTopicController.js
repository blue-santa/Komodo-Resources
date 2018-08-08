const thirdTopicQueries = require('../db/queries.thirdTopics.js');

module.exports = {

  new(req, res, next) {
    res.render('thirdTopics/new', { primaryTopicId: req.params.primaryTopicId, secondaryTopicId: req.params.secondaryTopicId })
  }

}
