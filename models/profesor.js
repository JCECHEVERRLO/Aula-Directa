'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Profesor.init({
    id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    creado_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Profesor',
  });

  Profesor.associate = function (models) {
    // Profesor pertenece a un Usuario
    Profesor.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',  
    });
  };
  return Profesor;
};