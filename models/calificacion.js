'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Calificacion.init({
    id: DataTypes.INTEGER,
    tarea_id: DataTypes.INTEGER,
    estudiante_id: DataTypes.INTEGER,
    calificacion: DataTypes.DECIMAL,
    comentario: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Calificacion',
  });
  Calificacion.associate = function (models) {
    // Calificación pertenece a una Tarea
    Calificacion.belongsTo(models.Tarea, {
      foreignKey: 'tarea_id',
      as: 'tarea',  // Alias para acceder a la relación
    });

    // Calificación pertenece a un Estudiante
    Calificacion.belongsTo(models.Estudiante, {
      foreignKey: 'estudiante_id',
      as: 'estudiante',  // Alias para acceder a la relación
    });
  };
  return Calificacion;
};