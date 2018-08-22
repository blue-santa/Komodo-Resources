'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tree = sequelize.define('Tree', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(10000),
      allowNull: false
    }
  }, {});
  Tree.associate = function(models) {
    // associations can be defined here
  };
  return Tree;
};
