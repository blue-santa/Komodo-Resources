'use strict';
module.exports = (sequelize, DataTypes) => {
  var NotaryNodeCandidate = sequelize.define('NotaryNodeCandidate', {
    name: DataTypes.STRING,
    details: DataTypes.STRING
  }, {});
  NotaryNodeCandidate.associate = function(models) {
    // associations can be defined here

    NotaryNodeCandidate.hasMany(models.Avatar, {
      foreignKey: "notaryNodeId",
      as: "avatars"
    });
  };
  return NotaryNodeCandidate;
};
