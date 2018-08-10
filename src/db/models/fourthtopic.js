'use strict';
module.exports = (sequelize, DataTypes) => {
  var FourthTopic = sequelize.define('FourthTopic', {
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
    },
    secondaryTopicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    thirdTopicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  FourthTopic.associate = function(models) {
    // associations can be defined here
    FourthTopic.belongsTo(models.PrimaryTopic, {
      foreignKey: 'primaryTopicId',
      onDelete: 'CASCADE'
    });
    FourthTopic.belongsTo(models.SecondaryTopic, {
      foreignKey: 'secondaryTopicId',
      onDelete: 'CASCADE'
    });
    FourthTopic.belongsTo(models.ThirdTopic, {
      foreignKey: 'thirdTopicId',
      onDelete: 'CASCADE'
    });

    FourthTopic.hasMany(models.FifthTopic, {
      foreignKey: 'fourthTopicId',
      as: 'fifthTopics'
    });
  };
  return FourthTopic;
};
