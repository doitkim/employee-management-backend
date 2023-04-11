const Sequelize = require("sequelize");

module.exports = class Branch extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        branchCode: {
          type: Sequelize.STRING(50),
          allowNull: false,
          primaryKey: true,
        },
        authenticationCode: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        branchName: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Branch",
        tableName: "Branchs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
