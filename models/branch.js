const { Model, DataTypes } = require("sequelize");

class Branch extends Model {
  static associate(models) {
    Branch.hasMany(models.Employee, {
      foreignKey: "branchId",
      onDelete: "CASCADE",
      hooks: true, // 추가
    });
  }

  static init(sequelize) {
    super.init(
      {
        branchId: {
          type: DataTypes.STRING(50),
          primaryKey: true,
        },
        authenticationCode: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        branchName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Branch",
        tableName: "Branches",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Branch;
