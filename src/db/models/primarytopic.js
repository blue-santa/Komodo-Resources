'use strict';
module.exports = (sequelize, DataTypes) => {
  var PrimaryTopic = sequelize.define('PrimaryTopic', {
    title: DataTypes.STRING
  }, {});
  PrimaryTopic.associate = function(models) {
    // associations can be defined here

  };
  return PrimaryTopic;
};
