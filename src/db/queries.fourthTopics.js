const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;
const ThirdTopic = require('./models').ThirdTopic;
const FourthTopic = require('./models').FourthTopic;
const FifthTopic = require('./models').FifthTopic;

module.exports = {

  addFourthTopic(newFourthTopic, callback) {
    return FourthTopic.create(newFourthTopic)
    .then((fourthTopic) => {
      callback(null, fourthTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getFourthTopic(id, callback) {
    return FourthTopic.findById(id, {
      include: [{
        model: FifthTopic,
        as: 'fifthTopics'
      }]
    })
    .then((fifthTopic) => {
      callback(null, fifthTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateFourthTopic(id, updatedFourthTopic, callback) {
    return FourthTopic.findById(id)
    .then((fourthTopic) => {
      if (!fourthTopic) {
        return callback('Fourth Topic not found');
      }
      fourthTopic.update(updatedFourthTopic, {
        fields: Object.keys(updatedFourthTopic)
      })
      .then(() => {
        callback(null, fourthTopic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  deleteFourthTopic(id, callback) {
    return FourthTopic.destroy({
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
