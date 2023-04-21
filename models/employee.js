const { Model, DataTypes } = require("sequelize");

class Employee extends Model {
  static associate(models) {
    Employee.belongsTo(models.Branch, {
      foreignKey: "branchId",
      onDelete: "CASCADE",
      hooks: true, // 추가
    });
    Employee.hasMany(models.WorkSchedule, {
      foreignKey: "employeeId", // 수정
      onDelete: "CASCADE",
      hooks: true, // 추가
    });
  }

  static init(sequelize) {
    super.init(
      {
        employeeId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        employeeName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        workDays: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        hireDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        leaveDate: {
          type: DataTypes.DATEONLY,
        },
        branchId: {
          type: DataTypes.STRING(50),
          allowNull: false,
          references: {
            model: "Branches",
            key: "branchId",
          },
        },
      },
      {
        sequelize,
        modelName: "Employee",
        tableName: "Employees",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = Employee;
