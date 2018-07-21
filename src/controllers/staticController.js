const primaryTopicQueries = require('../db/queries.primaryTopics');

module.exports = {
  index(req, res, next) {
    primaryTopicQueries.getAllPrimaryTopics((err, primaryTopics) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        res.render('static/index', { primaryTopics, title: 'Home: Komodo Resources' });
      }
    });
  }
}
