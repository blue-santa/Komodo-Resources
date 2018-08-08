const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;
const ThirdTopic = require('./models').ThirdTopic;

module.exports = {

  getSecondaryTopic(id, callback) {
    return SecondaryTopic.findById(id, {
      include: [{
        model: ThirdTopic,
        as: 'thirdTopics'
      }]
    })
    .then((secondaryTopic) => {
      callback(null, secondaryTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateSecondaryTopic(id, updatedSecondaryTopic, callback) {
    return SecondaryTopic.findById(id)
    .then((secondaryTopic) => {
      if (!secondaryTopic) {
        return callback('Secondary topic not found');
      }

      secondaryTopic.update(updatedSecondaryTopic, {
        fields: Object.keys(updatedSecondaryTopic)
      })
      .then(() => {
        callback(null, secondaryTopic);
      })
      .catch((err) => {
        callback(err);
      });
    })
  },

  addSecondaryTopic(newSecondaryTopic, callback) {
    return SecondaryTopic.create(newSecondaryTopic)
    .then((secondaryTopic) => {
      callback(null, secondaryTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  deleteSecondaryTopic(id, callback) {
    return SecondaryTopic.destroy({
      where: { id }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    });
  }

}
