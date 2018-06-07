'use strict';
module.exports = (sequelize, DataTypes) => {
  var Avatar = sequelize.define('Avatar', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    notaryNodeId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "NotaryNodeCandidates",
        key: "id",
        as: "notaryNodeId"
      }
    }
  }, {});
  Avatar.associate = function(models) {
    // associations can be defined here

    Avatar.belongsTo(models.NotaryNodeCandidate, {
      foreignKey: "notaryNodeId",
      onDelete:"CASCADE"
    });
  };
  return Avatar;
};
