const treeQueries = require('../db/queries.tree');
const primaryTopicQueries = require('../db/queries.primaryTopics');
const secondaryTopicQueries = require('../db/queries.secondaryTopics');
const thirdTopicQueries = require('../db/queries.thirdTopics');
const fourthTopicQueries = require('../db/queries.fourthTopics');

const fs = require('fs');
const path = require('path');

const base = path.join(__dirname + '../../assets/docs/');

let topicTree = [];

treeQueries.callTree((err, res) => {
  if (err) {
    return console.error(err);
  }
  return topicTree = res;
});

module.exports = {

  new(req, res, next) {
    res.render('fourthTopics/new', { primaryTopicId: req.params.primaryTopicId, secondaryTopicId: req.params.secondaryTopicId, thirdTopicId: req.params.thirdTopicId, topicTree });
  },

  create(req, res, next) {
    let newFourthTopic = {
      title: req.body.title,
      content: req.body.content,
      primaryTopicId: req.params.primaryTopicId,
      secondaryTopicId: req.params.secondaryTopicId,
      thirdTopicId: req.params.thirdTopicId
    };
    fourthTopicQueries.addFourthTopic(newFourthTopic, (err, fourthTopic) => {
      if (err) {
        res.redirect(500, '/fourthTopics/new');
      } else {
        res.redirect(303, `/primaryTopics/${fourthTopic.primaryTopicId}/secondaryTopics/${fourthTopic.secondaryTopicId}/thirdTopics/${fourthTopic.thirdTopicId}/fourthTopics/${fourthTopic.id}`);
      }
    });
  },

  show(req, res, next) {
    fourthTopicQueries.getFourthTopic(req.params.id, (err, fourthTopic) => {
      if (err || fourthTopic === null) {
        res.redirect(404, '/');
      } else {
        res.render('fourthTopics/show', { fourthTopic, topicTree });
      }
    });
  },

  update(req, res, next) {
    fourthTopicQueries.updateFourthTopic(req.params.id, req.body, (err, fourthTopic) => {
      if (err || fourthTopic === null) {
        res.redirect(404, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.id}/edit`);
      } else {
        res.redirect(`/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.id}`);
      }
    });
  },

  edit(req, res, next) {
    fourthTopicQueries.getFourthTopic(req.params.id, (err, fourthTopic) => {
      if (err || fourthTopic === null) {
        res.redirect(404, '/');
      } else {
        res.render('fourthTopics/edit', { fourthTopic, topicTree });
      }
    });
  },

  destroy(req, res, next) {
    fourthTopicQueries.deleteFourthTopic(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(500, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}/fourthTopics/${req.params.id}`);
      } else {
        res.redirect(303, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.thirdTopicId}`);
      }
    });
  }

}
