'use strict';
const { Model, DataTypes } = require('sequelize');  // ✅ Importa correctamente `Model`

module.exports = (sequelize) => {
  class Class extends Model {
    static associate(models) {
      // Aquí puedes definir relaciones si es necesario
    }
  }

  Class.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'classes',
    timestamps: false  // ✅ Ajusta los timestamps según lo necesites
  });

  return Class;
};
