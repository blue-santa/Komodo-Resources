const treeQueries = require('../src/db/queries.tree.js');

module.exports = {

  buildTree(callback) {
    treeQueries.buildTree((err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res);
    }
  },

  callTree(callback) {
    treeQueries.callTree((err, res) => {
      if (err) {
        callback(err);
      }
      callback(null, res);
    });
  }

}
