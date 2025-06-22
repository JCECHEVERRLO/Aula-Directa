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
db.Student = require('./student')(sequelize, Sequelize.DataTypes); // no olvides este si ya lo tienes

// Asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
