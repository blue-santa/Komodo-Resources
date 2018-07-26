const PrimaryTopic = require('./models').PrimaryTopic;
const SecondaryTopic = require('./models').SecondaryTopic;

const captureTitles = function(DatabaseName) {
  DatabaseName.all()
  .then((databaseData) => {
    /* Come back to finish later */
  })
  .catch((err) => {
    return console.log(err);
  });
}

module.exports = {

  buildTopicTree(callback) {
    let topicTree = [];
    PrimaryTopic.all()
    .then((primaryTopics) => {
      for (let i = 0; i < primaryTopics.length; i++) {
        let currentPrimaryTopic = {
          primaryTopicId: primaryTopics[i].id,
          title: primaryTopics[i].title
        };
        SecondaryTopic.findAll({ where: { primaryTopicId: primaryTopics[i].id }})
        .then((fullSecondaryTopics) => {
          let abbreviatedSecondaryTopics = [];
          for (let j = 0; j < fullSecondaryTopics.length; j++) {
            abbreviatedSecondaryTopics.push({
              secondaryTopicId: fullSecondaryTopics[j].id,
              title: fullSecondaryTopics[j].title
            });
          };
          currentPrimaryTopic.secondaryTopics = abbreviatedSecondaryTopics;
        })
        .catch((err) => {
          callback(err);
        });

        topicTree.push(currentPrimaryTopic);
      };
      callback(null, topicTree);
    })
    .catch((err) => {
      callback(err);
    });
  }

}
