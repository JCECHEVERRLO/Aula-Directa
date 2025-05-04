'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ClassGrade extends Model {
    static associate(models) {
      // ClassGrade pertenece a una Clase
      ClassGrade.belongsTo(models.Class, {
        foreignKey: 'class_id',
        as: 'class',  
      });

      // ClassGrade pertenece a un Grado
      ClassGrade.belongsTo(models.Grade, {
        foreignKey: 'grade_id',
        as: 'grade',  
      });

      // ClassGrade pertenece a un Profesor
      ClassGrade.belongsTo(models.Teacher, {
        foreignKey: 'teacher_id',
        as: 'teacher', 
      });
    }
  }

  ClassGrade.init({
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
  });

  return ClassGrade;
};
