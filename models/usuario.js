'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuario.init({
    id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    rol: DataTypes.STRING,
    creado_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};