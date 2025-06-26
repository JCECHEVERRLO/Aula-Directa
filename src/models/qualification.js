'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    static associate(models) {
      // Calificación pertenece a una tarea
      Qualification.belongsTo(models.Task, {
        foreignKey: 'task_id',
        as: 'tarea'
      });

      // Calificación pertenece a un estudiante
      Qualification.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'estudiante'
      });
    }
  }

  Qualification.init({
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Qualification',
    tableName: 'qualifications',
    timestamps: true,
    underscored: true,
  });

  return Qualification;
};
