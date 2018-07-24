const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;

module.exports = {
  getAllPrimaryTopics(callback) {
    return PrimaryTopic.all()
    .then((primarytopics) => {
      callback(null, primarytopics);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getPrimaryTopic(id, callback) {
    return PrimaryTopic.findById(id, {
      include: [{
        model: SecondaryTopic,
        as: "secondaryTopics"
      }]
    })
    .then((primaryTopic) => {
      callback(null, primaryTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  addPrimaryTopic(newPrimaryTopic, callback) {
    return PrimaryTopic.create({
      title: newPrimaryTopic.title,
      content: newPrimaryTopic.content
    })
    .then((primaryTopic) => {
      callback(null, primaryTopic);
    })
    .catch((err) => {
      callback(err);
    })
  },

  updatePrimaryTopic(id, updatedPrimaryTopic, callback) {
    return PrimaryTopic.findById(id)
    .then((primaryTopic) => {
      if (!primaryTopic) {
        return callback('Primary Topic not found');
      }

      primaryTopic.update(updatedPrimaryTopic, {
        fields: Object.keys(updatedPrimaryTopic)
      })
      .then(() => {
        callback(null, primaryTopic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  deletePrimaryTopic(id, callback) {
    return PrimaryTopic.destroy({
      where: { id }
    })
    .then((primaryTopic) => {
      callback(null, primaryTopic);
    })
    .catch((err) => {
      callback(err);
    });
  }
}
