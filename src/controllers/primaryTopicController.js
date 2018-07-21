const primaryTopicQueries = require('../db/queries.primaryTopics.js');

module.exports = {
  index(req, res, next) {
    primaryTopicQueries.getAllPrimaryTopics((err, primaryTopics) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        res.render('primaryTopics/index', { primaryTopics, title: 'Primary Topics: Komodo Resources' });
      }
    });
  },

  new(req, res, next) {
    res.render('primaryTopics/new', { title: 'New Primary Topic'});
  },

  create(req, res, next) {
    let newPrimaryTopic = {
      title: req.body.title
    };
    primaryTopicQueries.addPrimaryTopic(newPrimaryTopic, (err, primaryTopic) => {
      if (err) {
        res.redirect(500, '/primaryTopics/new');
      } else {
        res.redirect(303, `/primaryTopics/${primaryTopic.id}`);
      }
    });
  },

  show(req, res, next) {
    primaryTopicQueries.getPrimaryTopic(req.params.id, (err, primaryTopic) => {
      if (err || primaryTopic == null) {
        res.redirect(404, '/');
      } else {
        res.render('primaryTopics/show', { primaryTopic, title: `${primaryTopic.title}: Komodo Resources` });
      }
    });
  },

  edit(req, res, next) {
    primaryTopicQueries.getPrimaryTopic(req.params.id, (err, primaryTopic) => {
      if (err || primaryTopic == null) {
        res.redirect(404, '/');
      } else {
        res.render('primaryTopics/edit', { primaryTopic, title: `Update: ${primaryTopic.title}` });
      }
    });
  },

  update(req, res, next) {
    primaryTopicQueries.updatePrimaryTopic(req.params.id, req.body, (err, primaryTopic) => {
      if(err || primaryTopic == null) {
        res.redirect(404, `/primaryTopics/${req.params.id}/edit`);
      } else {
        res.redirect(`/primaryTopics/${primaryTopic.id}`);
      }
    });
  },

  destroy(req, res, next) {
    primaryTopicQueries.deletePrimaryTopic(req.params.id, (err, primaryTopic) => {
      if (err) {
        res.redirect(500, `/primaryTopics/${primaryTopic.id}`);
      } else {
        res.redirect(303, '/primaryTopics')
      }
    });
  }

}
