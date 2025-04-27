'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Grado.init({
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    creado_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Grado',
  });
  return Grado;
};