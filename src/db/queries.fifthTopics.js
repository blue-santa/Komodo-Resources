const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;
const ThirdTopic = require('./models').ThirdTopic;
const FourthTopic = require('./models').FourthTopic;
const FifthTopic = require('./models').FifthTopic;

module.exports = {

  addFifthTopic(newFifthTopic, callback) {
    return FifthTopic.create(newFifthTopic)
    .then((fifthTopic) => {
      callback(null, fifthTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getFifthTopic(id, callback) {
    return FifthTopic.findById(id)
    .then((fifthTopic) => {
      callback(null, fifthTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateFifthTopic(id, updatedFifthTopic, callback) {
    return FifthTopic.findById(id)
    .then((fifthTopic) => {
      if (!fifthTopic) {
        return callback('Fifth Topic not found');
      }
      fifthTopic.update(updatedFifthTopic, {
        fields: Object.keys(updatedFifthTopic)
      })
      .then(() => {
        callback(null, fifthTopic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  deleteFifthTopic(id, callback) {
    return FifthTopic.destroy({
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
