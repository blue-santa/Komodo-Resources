'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Avatars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      source: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      notaryNodeId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "NotaryNodeCandidates",
          key: "id",
          as: "notaryNodeId"
        }
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Avatars');

    Avatar.belongsTo(models.NotaryNodeCandidate, {
      foreignKey: "notaryNodeId",
      onDelete: "CASCADE"
    });
  }
};
