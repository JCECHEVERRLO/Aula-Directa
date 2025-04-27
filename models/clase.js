'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Clase.init({
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    creado_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Clase',
  });
  return Clase;
};