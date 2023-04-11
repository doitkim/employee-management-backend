const Sequelize = require("sequelize");
const Branch = require("./branch");
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

Branch.init(sequelize);
module.exports = db;
