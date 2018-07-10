const PrimaryTopic = require('./models').PrimaryTopic;

module.exports = {
  getAllPrimaryTopics(callback){
    return PrimaryTopic.all()
    .then((primarytopics) => {
      callback(null, primarytopics);
    })
    .catch((err) => {
      callback(err);
    });
  }
}
