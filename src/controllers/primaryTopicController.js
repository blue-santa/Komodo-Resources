const primaryTopicQueries = require('../db/queries.primaryTopics.js');

module.exports = {
  index(req, res, next) {
    primaryTopicQueries.getAllPrimaryTopics((err, primaryTopics) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        res.render('primaryTopics/index', { primaryTopics, title: 'Komodo Resources' });
      }
    });
  }
}
