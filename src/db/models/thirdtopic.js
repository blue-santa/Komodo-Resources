'use strict';
module.exports = (sequelize, DataTypes) => {
  var ThirdTopic = sequelize.define('ThirdTopic', {
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
    }
  }, {});
  ThirdTopic.associate = function(models) {
    // associations can be defined here
    ThirdTopic.belongsTo(models.PrimaryTopic, {
      foreignKey: 'primaryTopicId',
      onDelete: 'CASCADE'
    });

    ThirdTopic.belongsTo(models.SecondaryTopic, {
      foreignKey: 'secondaryTopicId',
      onDelete: 'CASCADE'
    });

  };
  return ThirdTopic;
};
