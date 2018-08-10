const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;
const ThirdTopic = require('./models').ThirdTopic;
const FourthTopic = require('./models').FourthTopic;

module.exports = {

  addThirdTopic(newThirdTopic, callback) {
    return ThirdTopic.create(newThirdTopic)
    .then((thirdTopic) => {
      callback(null, thirdTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  getThirdTopic(id, callback) {
    return ThirdTopic.findById(id, {
      include: [{
        model: FourthTopic,
        as: 'fourthTopics'
      }]
    })
    .then((thirdTopic) => {
      callback(null, thirdTopic);
    })
    .catch((err) => {
      callback(err);
    });
  },

  updateThirdTopic(id, updatedThirdTopic, callback) {
    return ThirdTopic.findById(id)
    .then((thirdTopic) => {
      if (!thirdTopic) {
        return callback('Third Topic not found');
      }
      thirdTopic.update(updatedThirdTopic, {
        fields: Object.keys(updatedThirdTopic)
      })
      .then(() => {
        callback(null, thirdTopic);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },

  deleteThirdTopic(id, callback) {
    return ThirdTopic.destroy({
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
