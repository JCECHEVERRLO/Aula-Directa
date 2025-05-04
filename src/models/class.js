'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      // Associations can be defined here
      // Por ejemplo: Class.belongsToMany(models.Teacher, { through: 'TeacherClasses' })
    }
  }

  Class.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Class',
    tableName: 'classes',
    timestamps: true,
  });

  return Class;
};
