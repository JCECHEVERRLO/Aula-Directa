'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      // Student belongs to a Grade
      Student.belongsTo(models.Grade, {
        foreignKey: 'grade_id',
        as: 'grade',
      });

      // Student belongs to a Parent
      Student.belongsTo(models.Parent, {
        foreignKey: 'parent_id',
        as: 'parent',
      });
    }
  }

  Student.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'grades',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parents',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
  }, {
    sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: true,
  });

  return Student;
};
