const { Sequelize } = require("sequelize");
const Branch = require("./branch");
const Employee = require("./employee");
const WorkSchedule = require("./workSchedule");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Branch = Branch;
db.Employee = Employee;
db.WorkSchedule = WorkSchedule;

Branch.init(sequelize);
Employee.init(sequelize);
WorkSchedule.init(sequelize);

module.exports = db;
