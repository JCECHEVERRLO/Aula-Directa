'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Tarea pertenece a un grupo (ClassGrade)
      Task.belongsTo(models.Classgrade, {
        foreignKey: 'class_grade_id',
        as: 'classGrade',
      });

      // Tarea tiene muchas calificaciones
      Task.hasMany(models.Qualification, {
        foreignKey: 'task_id',
        as: 'calificaciones'
      });
    }
  }

  Task.init({
    class_grade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    due_date: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    underscored: true,
  });

  return Task;
};
