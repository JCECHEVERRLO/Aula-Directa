'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asistencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asistencia.init({
    id: DataTypes.INTEGER,
    estudiante_id: DataTypes.INTEGER,
    clasegrado_id: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    presente: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Asistencia',
  });

   
   ClasesGrados.associate = function (models) {
    // ClasesGrados pertenece a una Clase
    ClasesGrados.belongsTo(models.Clase, {
      foreignKey: 'clase_id',
      as: 'clase',  // Alias para acceder a la relación
    });

    // ClasesGrados pertenece a un Grado
    ClasesGrados.belongsTo(models.Grado, {
      foreignKey: 'grado_id',
      as: 'grado',  // Alias para acceder a la relación
    });

    // ClasesGrados pertenece a un Profesor
    ClasesGrados.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id',
      as: 'profesor',  // Alias para acceder a la relación
    });
  };
  return Asistencia;
};