const { Model, DataTypes } = require("sequelize");

class Employee extends Model {
  static associate(models) {
    Employee.belongsTo(models.Branch, {
      foreignKey: "branchId",
      onDelete: "CASCADE",
      hooks: true,
    });
    Employee.hasMany(models.WorkSchedule, {
      foreignKey: "employeeId",
      onDelete: "CASCADE",
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
