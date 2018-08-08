'use strict';
module.exports = (sequelize, DataTypes) => {
  var PrimaryTopic = sequelize.define('PrimaryTopic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(1000000),
      allowNull: false
    }
  }, {});
  PrimaryTopic.associate = function(models) {
    // associations can be defined here
    PrimaryTopic.hasMany(models.SecondaryTopic, {
      foreignKey: "primaryTopicId",
      as: "secondaryTopics"
    });

    PrimaryTopic.hasMany(models.ThirdTopic, {
      foreignKey: 'primaryTopicId',
      as: 'thirdTopics'
    });
  };
  return PrimaryTopic;
};
