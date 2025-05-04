'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // A Task belongs to a ClassGrade
      Task.belongsTo(models.ClassGrade, {
        foreignKey: 'class_grade_id',
        as: 'classGrade',
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
    tableName: 'tasks', // <- importante para seguir convención en plural y minúscula
    timestamps: true,
  });

  return Task;
};
