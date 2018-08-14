const treeQueries = require('../db/queries.tree');
const primaryTopicQueries = require('../db/queries.primaryTopics');
const secondaryTopicQueries = require('../db/queries.secondaryTopics');
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
  index(req, res, next) {
    primaryTopicQueries.getAllPrimaryTopics((err, primaryTopics) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        treeQueries.callTree((newTree) => {
          return tree = newTree;
        });
        res.render('primaryTopics/index', { primaryTopics, topicTree });
      }
    });
  },

  new(req, res, next) {
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
        res.render('primaryTopics/show', { primaryTopic, topicTree });
      }
    });
  },

  edit(req, res, next) {
    primaryTopicQueries.getPrimaryTopic(req.params.id, (err, primaryTopic) => {
      if (err || primaryTopic == null) {
        res.redirect(404, '/');
      } else {
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
