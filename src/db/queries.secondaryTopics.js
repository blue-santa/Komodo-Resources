const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;

module.exports = {

  getSecondaryTopic(id, callback) {
    return SecondaryTopic.findById(id)
    .then((secondaryTopic) => {
      callback(null, secondaryTopic);
    })
    .catch((err) => {
      callback(err);
    });
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
