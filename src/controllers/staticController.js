const primaryTopicQueries = require('../db/queries.primaryTopics');
const allTopicQueries = require('../db/queries.allTopics.js');

let topicTree = [];

allTopicQueries.buildTopicTree((err, topicTreeCall) => {
  if (topicTreeCall === undefined ) {
    topicTreeCall = [];
    topicTreeCall.push({
      title: `I'm a little teapot`,
      primaryTopicId: 0
    });
  }

  if (topicTreeCall[0].secondaryTopics === undefined) {
    topicTreeCall[0].secondaryTopics = [];
    topicTreeCall[0].secondaryTopics.push({
      title: `short and stout`,
      secondaryTopicId: 0
    });
  }

  return topicTree = topicTreeCall;
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
