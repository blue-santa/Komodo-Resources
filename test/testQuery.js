const treeQueries = require('../src/db/queries.tree');
const PrimaryTopic = require('../src/db/models').PrimaryTopic;
const ThirdTopic = require('../src/db/models').ThirdTopic;

treeQueries.buildTree((err, res) => {
  if (err) {
    console.error(err);
  }
  treeQueries.callTree((err, res) => {
    if (err) {
      console.error(err);
    }
    const primaryTopics = res;
    res.forEach((primaryTopic) => {
      console.log(`\n`, primaryTopic.title);
      primaryTopic.secondaryTopics.forEach((secondaryTopic) => {
        console.log(`  `, secondaryTopic.title);
      });
    });
    process.exit();
  });
});
