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
        workDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        workStartTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
        workEndTime: {
          type: DataTypes.TIME,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "WorkSchedule",
        tableName: "work_schedules",
        timestamps: false,
      }
    );
  }
}

module.exports = WorkSchedule;
