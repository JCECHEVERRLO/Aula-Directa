'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarea extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarea.init({
    id: DataTypes.INTEGER,
    clase_grado_id: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    fecha_entrega: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tarea',
  });

  Tarea.associate = function (models) {
    // Tarea pertenece a un ClaseGrado
    Tarea.belongsTo(models.ClasesGrados, {
      foreignKey: 'clase_grado_id',
      as: 'claseGrado',  // Alias para acceder a la relación
    });
  };
  return Tarea;
};