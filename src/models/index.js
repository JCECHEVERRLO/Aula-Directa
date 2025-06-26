'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};
const basename = path.basename(__filename);

// 1. Cargar todos los modelos y almacenarlos por nombre definido en modelName
fs.readdirSync(__dirname)
  .filter(file =>
    file !== basename &&
    file.endsWith('.js') &&
    !file.startsWith('.')
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // ← Aquí usamos `model.name`, que viene de `modelName`
  });

// 2. Asociar todos los modelos después de cargarlos
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db); // ← Pasamos todos los modelos al método associate
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
