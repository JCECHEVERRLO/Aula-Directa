const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.Class = require('./Class')(sequelize, Sequelize.DataTypes);
db.Grade = require('./grade')(sequelize, Sequelize.DataTypes);
db.Parent = require('./parent')(sequelize, Sequelize.DataTypes);
db.Teacher = require('./teacher')(sequelize, Sequelize.DataTypes);

module.exports = db;
