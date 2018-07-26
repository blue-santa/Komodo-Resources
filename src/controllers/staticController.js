const primaryTopicQueries = require('../db/queries.primaryTopics');
const allTopicQueries = require('../db/queries.allTopics.js');

let topicTree = [];

allTopicQueries.buildTopicTree((err, topicTreeCall) => {
  if (!topicTreeCall) {
    return topicTree.push({ title: 'You need to add more stuff!' });
  }
  topicTree = topicTreeCall;
});

module.exports = {
  index(req, res, next) {
    primaryTopicQueries.getAllPrimaryTopics((err, primaryTopics) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        res.render('static/index', { primaryTopics, topicTree });
      }
    });
  }
}
