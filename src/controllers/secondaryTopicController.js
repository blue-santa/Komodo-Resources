const secondaryTopicQueries = require('../db/queries.secondaryTopics.js');

module.exports = {

  new(req, res, next) {
    res.render('secondaryTopics/new', { primaryTopicId: req.params.primaryTopicId, title: 'New Secondary Topic' });
  },

  show(req, res, next) {
    secondaryTopicQueries.getSecondaryTopic(req.params.id, (err, secondaryTopic) => {
      if (err || secondaryTopic == null) {
        res.redirect(404, '/');
      } else {
        res.render('secondaryTopics/show', { secondaryTopic, title: `${secondaryTopic.title}: Komodo Resources` });
      }
    });
  },

  create(req, res, next) {
    let newSecondaryTopic = {
      title: req.body.title,
      content: req.body.content,
      primaryTopicId: req.params.primaryTopicId
    };
    secondaryTopicQueries.addSecondaryTopic(newSecondaryTopic, (err, secondaryTopic) => {
      if (err) {
        res.redirect(500, '/secondaryTopics/new');
      } else {
        res.redirect(303, `/primaryTopics/${secondaryTopic.primaryTopicId}/secondaryTopics/${secondaryTopic.id}`);
      }
    });
  },

  edit(req, res, next) {
    secondaryTopicQueries.getSecondaryTopic(req.params.id, (err, secondaryTopic) => {
      if (err || secondaryTopic == null) {
        res.redirect(404, '/');
      } else {
        res.render(`secondaryTopics/edit`, { secondaryTopic, title: `${secondaryTopic.title}: Komodo Resources` });
      }
    });
  },

  update(req, res, next) {
    secondaryTopicQueries.updateSecondaryTopic(req.params.id, req.body, (err, secondaryTopic) => {
      if (err || secondaryTopic == null) {
        res.redirect(404, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.id}/edit`);
      } else {
        res.redirect(`/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.id}`);
      }
    });
  },

  destroy(req, res, next) {
    secondaryTopicQueries.deleteSecondaryTopic(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(500, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.id}`)
      } else {
        res.redirect(303, `/primaryTopics/${req.params.primaryTopicId}`);
      }
    });
  }

}
