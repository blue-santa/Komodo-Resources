'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tree = sequelize.define('Tree', {
    title: DataTypes.STRING,
    content: DataTypes.STRING(10000)
  }, {});
  Tree.associate = function(models) {
    // associations can be defined here
  };
  return Tree;
};
