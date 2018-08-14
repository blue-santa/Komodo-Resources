const treeQueries = require('../db/queries.tree');
const primaryTopicQueries = require('../db/queries.primaryTopics');

let topicTree = [];

treeQueries.callTree((err, res) => {
  if (err) {
    return console.error(err);
  }
  return topicTree = res;
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
