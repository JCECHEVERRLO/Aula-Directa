'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Classgrade extends Model {
    static associate(models) {
      Classgrade.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'class',
      });

      Classgrade.belongsTo(models.Grade, {
        foreignKey: 'grade_id',
        as: 'grade',
      });

      Classgrade.belongsTo(models.Teacher, {
        foreignKey: 'teacher_id',
        as: 'teacher',
      });

      Classgrade.hasMany(models.Task, {
        foreignKey: 'class_grade_id',
        as: 'tasks',
      });
    }
  }

  Classgrade.init({
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Classgrade',
    tableName: 'class_grades',
    timestamps: true,
    underscored: false,
  });

  return Classgrade;
};
