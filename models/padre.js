'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Padre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Padre.init({
    id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    creado_en: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Padre',
  });

  Padre.associate = function (models) {
    // Padre pertenece a un Usuario
    Padre.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario',  
    });
  };

  return Padre;
};