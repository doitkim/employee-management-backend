const { Model, DataTypes } = require("sequelize");

class WorkSchedule extends Model {
  static associate(models) {
    WorkSchedule.belongsTo(models.Employee, {
      foreignKey: "employeeName",
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
        modelName: "WorkSchedule",
        tableName: "workSchedules",
        timestamps: false,
      }
    );
  }
}

module.exports = WorkSchedule;
