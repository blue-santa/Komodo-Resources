'use strict';
module.exports = (sequelize, DataTypes) => {
  var FifthTopic = sequelize.define('FifthTopic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
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
    },
    fourthTopicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  FifthTopic.associate = function(models) {
    // associations can be defined here
    FifthTopic.belongsTo(models.PrimaryTopic, {
      foreignKey: 'primaryTopicId',
      onDelete: 'CASCADE'
    });
    FifthTopic.belongsTo(models.SecondaryTopic, {
      foreignKey: 'secondaryTopicId',
      onDelete: 'CASCADE'
    });
    FifthTopic.belongsTo(models.ThirdTopic, {
      foreignKey: 'thirdTopicId',
      onDelete: 'CASCADE'
    });
    FifthTopic.belongsTo(models.FourthTopic, {
      foreignKey: 'fourthTopicId',
      onDelete: 'CASCADE'
    });
  };
  return FifthTopic;
};
