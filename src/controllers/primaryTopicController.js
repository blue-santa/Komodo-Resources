const primaryTopicQueries = require('../db/queries.primaryTopics.js');
const secondaryTopicQueries = require('../db/queries.secondaryTopics.js');
const allTopicQueries = require('../db/queries.allTopics.js');
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname + '../../assets/docs/');

let topicTree = [];

function buildTree() {
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
}

buildTree();

module.exports = {
  index(req, res, next) {
    primaryTopicQueries.getAllPrimaryTopics((err, primaryTopics) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        buildTree();
        res.render('primaryTopics/index', { primaryTopics, topicTree });
      }
    });
  },

  new(req, res, next) {
    buildTree();
    res.render('primaryTopics/new', { topicTree });
  },

  create(req, res, next) {
    let newPrimaryTopic = {
      title: req.body.title,
      content: req.body.content
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
        buildTree();
        res.render('primaryTopics/show', { primaryTopic, topicTree });
      }
    });
  },

  edit(req, res, next) {
    primaryTopicQueries.getPrimaryTopic(req.params.id, (err, primaryTopic) => {
      if (err || primaryTopic == null) {
        res.redirect(404, '/');
      } else {
        buildTree();
        res.render('primaryTopics/edit', { primaryTopic, topicTree });
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
