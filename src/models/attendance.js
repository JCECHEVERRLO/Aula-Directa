'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      // Attendance belongs to Student
      Attendance.belongsTo(models.Student, {
        foreignKey: 'student_id',
        as: 'student',
      });

      // Attendance belongs to ClassGrade
      Attendance.belongsTo(models.Classgrade, {
        foreignKey: 'classgrade_id',
        as: 'class_grades',
      });
    }
  }

  Attendance.init({
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classgrade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    present: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'attendances',
    timestamps: true,
    underscored: true,
  });

  return Attendance;
};
