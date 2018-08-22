const treeQueries = require('../db/queries.tree');
const primaryTopicQueries = require('../db/queries.primaryTopics');
const secondaryTopicQueries = require('../db/queries.secondaryTopics');
const thirdTopicQueries = require('../db/queries.thirdTopics');
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
    res.render('thirdTopics/new', { primaryTopicId: req.params.primaryTopicId, secondaryTopicId: req.params.secondaryTopicId, topicTree })
  },

  create(req, res, next) {
    let newThirdTopic = {
      title: req.body.title,
      content: req.body.content,
      primaryTopicId: req.params.primaryTopicId,
      secondaryTopicId: req.params.secondaryTopicId
    };
    thirdTopicQueries.addThirdTopic(newThirdTopic, (err, thirdTopic) => {
      if (err) {
        res.redirect(500, '/thirdTopics/new');
      } else {
        res.redirect(303, `/primaryTopics/${thirdTopic.primaryTopicId}/secondaryTopics/${thirdTopic.secondaryTopicId}/thirdTopics/${thirdTopic.id}`);
      }
    });
  },

  show(req, res, next) {
    thirdTopicQueries.getThirdTopic(req.params.id, (err, thirdTopic) => {
      if (err || thirdTopic === null) {
        res.redirect(404, '/');
      } else {
        res.render('thirdTopics/show', { thirdTopic, topicTree });
      }
    });
  },

  edit(req, res, next) {
    thirdTopicQueries.getThirdTopic(req.params.id, (err, thirdTopic) => {
      if (err || thirdTopic === null) {
        res.redirect(404, '/');
      } else {
        res.render('thirdTopics/edit', { thirdTopic });
      }
    });
  },

  update(req, res, next) {
    thirdTopicQueries.updateThirdTopic(req.params.id, req.body, (err, thirdTopic) => {
      if (err || thirdTopic === null) {
        res.redirect(404, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.id}/edit`);
      } else {
        res.redirect(`/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdTopics/${req.params.id}`);
      }
    });
  },

  destroy(req, res, next) {
    thirdTopicQueries.deleteThirdTopic(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(500, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}/thirdtopics/${req.params.id}`);
      } else {
        res.redirect(303, `/primaryTopics/${req.params.primaryTopicId}/secondaryTopics/${req.params.secondaryTopicId}`);
      }
    });
  }

}
