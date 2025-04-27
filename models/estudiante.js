'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Estudiante.init({
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    grado_id: DataTypes.INTEGER,
    padre_id: DataTypes.INTEGER,
    creado_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Estudiante',
  });

  
  
  Estudiante.associate = function (models) {
    // Estudiante pertenece a un Grado
    Estudiante.belongsTo(models.Grado, {
      foreignKey: 'grado_id',
      as: 'grado',
    });
    
    // Estudiante pertenece a un Padre
    Estudiante.belongsTo(models.Padre, {
      foreignKey: 'padre_id',
      as: 'padre',
    });
  };


  return Estudiante;
};