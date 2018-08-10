'use strict';
module.exports = (sequelize, DataTypes) => {
  var SecondaryTopic = sequelize.define('SecondaryTopic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(1000000),
      allowNull: false
    },
    primaryTopicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  SecondaryTopic.associate = function(models) {
    // associations can be defined here
    SecondaryTopic.belongsTo(models.PrimaryTopic, {
      foreignKey: "primaryTopicId",
      onDelete: "CASCADE"
    });

    SecondaryTopic.hasMany(models.ThirdTopic, {
      foreignKey: 'secondaryTopicId',
      as: 'thirdTopics'
    });
    SecondaryTopic.hasMany(models.FourthTopic, {
      foreignKey: 'secondaryTopicId',
      as: 'fourthTopics'
    });
    SecondaryTopic.hasMany(models.FifthTopic, {
      foreignKey: 'secondaryTopicId',
      as: 'fifthTopics'
    });
  };
  return SecondaryTopic;
};
