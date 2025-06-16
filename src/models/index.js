const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Class = require('./Class')(sequelize, Sequelize.DataTypes);  // ✅ Ahora `Class` está registrado

module.exports = db;
