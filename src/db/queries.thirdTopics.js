const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;
const ThirdTopic = require('./models').ThirdTopic;

module.exports = {

  addThirdTopic(newThirdTopic, callback) {
    return ThirdTopic.create(newThirdTopic)
    .then((thirdTopic) => {
      callback(null, thirdTopic);
    })
    .catch((err) => {
      callback(err);
    });
  }

}
