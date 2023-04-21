const { Model, DataTypes } = require("sequelize");

class WorkSchedule extends Model {
  static associate(models) {
    WorkSchedule.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      onDelete: "CASCADE",
      hooks: true,
    });
  }

  static init(sequelize) {
    super.init(
      {
        workScheduleId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        employeeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Employees",
            key: "employeeId",
          },
        },
        employeeName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        workStartTime: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        workEndTime: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "WorkSchedule",
        tableName: "WorkSchedules",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = WorkSchedule;
