const treeQueries = require('../src/db/queries.tree.js');
const path = require('path');
const fs = require('fs-extra');

let primaryTopics;

treeQueries.buildTree((err, res) => {
  if (err) {
    console.error(err);
    return process.exit();
  }
  treeQueries.callTree((err, res) => {
    if (err) {
      console.error(err);
      return process.exit();
    }
    primaryTopics = res;
    console.log(`the end`);
    console.log(primaryTopics[0].secondaryTopics[0].title);
    return process.exit();
  });
});

setTimeout(() => {
}, 1000);
