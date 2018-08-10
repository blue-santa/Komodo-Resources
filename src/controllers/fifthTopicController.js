const allTopicQueries = require('../db/queries.allTopics.js');
const primaryTopicQueries = require('../db/queries.primaryTopics.js');
const secondaryTopicQueries = require('../db/queries.secondaryTopics.js');
const thirdTopicQueries = require('../db/queries.thirdTopics.js');
const fourthTopicQueries = require('../db/queries.fourthTopics.js');
const fifthTopicQueries = require('../db/queries.fifthTopics.js');

const fs = require('fs');
const path = require('path');

const base = path.join(__dirname + '../../assets/docs/');

module.exports = {

  new(req, res, next) {
    res.render('fifthTopics/new', { primaryTopicId: req.params.primaryTopicId, secondaryTopicId: req.params.secondaryTopicId, thirdTopicId: req.params.thirdTopicId, fourthTopicId: req.params.fourthTopicId })
  },

  create(req, res, next) {
    let newFifthTopic = {
      title: req.body.title,
      content: req.body.content,
      primaryTopicId: req.params.primaryTopicId,
      secondaryTopicId: req.params.secondaryTopicId,
      thirdTopicId: req.params.thirdTopicId,
      fourthTopicId: req.params.fourthTopicId
    };
    fifthTopicQueries.addFifthTopic(newFifthTopic, (err, fifthTopic) => {
      if (err) {
        res.redirect(500, '/fifthTopics/new');
      } else {
        res.redirect(303, `/primaryTopics/${fifthTopic.primaryTopicId}/secondaryTopics/${fifthTopic.secondaryTopicId}/thirdTopics/${fifthTopic.thirdTopicId}/fourthTopics/${fifthTopic.fourthTopicId}/fifthTopics/${fifthTopic.id}`);
      }
    });
  },

  show(req, res, next) {
    fifthTopicQueries.getFifthTopic(req.params.id, (err, fifthTopic) => {
      if (err || fifthTopic === null) {
        res.redirect(404, '/');
      } else {
        res.render('fifthTopics/show', { fifthTopic });
      }
    });
  },

  edit(req, res, next) {
    fifthTopicQueries.getFifthTopic(req.params.id, (err, fifthTopic) => {
      if (err || fifthTopic === null) {
        res.redirect(404, '/');
      } else {
        res.render('fifthTopics/edit', { fifthTopic });
      }
    });
  },

  update(req, res, next) {
    fifthTopicQueries.updateFifthTopic(req.params.id, req.body, (err, fifthTopic) => {
      if (err || fifthTopic === null) {
        res.redirect(404, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.fourthTopicId}/fifthTopics/${req.params.id}/edit`);
      } else {
        res.redirect(`/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.fourthTopicId}/fifthTopics/${req.params.id}`);
      }
    });
  },

  destroy(req, res, next) {
    fifthTopicQueries.deleteFifthTopic(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(500, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.fourthTopicId}/fifthTopics/${req.params.id}`);
      } else {
        res.redirect(303, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.fourthTopicId}`);
      }
    });
  }

}
