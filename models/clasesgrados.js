'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClasesGrados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ClasesGrados.init({
    id: DataTypes.INTEGER,
    clase_id: DataTypes.INTEGER,
    grado_id: DataTypes.INTEGER,
    profesor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClasesGrados',
  });
  ClasesGrados.associate = function (models) {
    // ClasesGrados pertenece a una Clase
    ClasesGrados.belongsTo(models.Clase, {
      foreignKey: 'clase_id',
      as: 'clase',  
    });

    // ClasesGrados pertenece a un Grado
    ClasesGrados.belongsTo(models.Grado, {
      foreignKey: 'grado_id',
      as: 'grado',  
    });

    // ClasesGrados pertenece a un Profesor
    ClasesGrados.belongsTo(models.Profesor, {
      foreignKey: 'profesor_id',
      as: 'profesor', 
    });
  };
  return ClasesGrados;
};