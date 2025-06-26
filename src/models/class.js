'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Class extends Model {
    static associate(models) {
      Class.hasMany(models.Classgrade, {
        foreignKey: 'class_id',
        as: 'classgrades',
      });
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
    timestamps: false,
  });

  return Class;
};
