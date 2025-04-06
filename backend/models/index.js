const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// import models
db.Capture = require("./Capture")(sequelize, DataTypes);

module.exports = db;
