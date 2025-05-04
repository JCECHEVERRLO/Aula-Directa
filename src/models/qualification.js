'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Qualification extends Model {
    static associate(models) {
      // Qualification belongs to a Task
      Qualification.belongsTo(models.Task, {
        foreignKey: 'task_id',
        as: 'task',
      });

      // Qualification belongs to a Student
      Qualification.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'student',
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
      type: DataTypes.DECIMAL(5,2),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Qualification',
    tableName: 'Qualifications',  // 👈 Table in plural, English
    timestamps: true,
    underscored: true,  // 👈 uses created_at and updated_at
  });

  return Qualification;
};
