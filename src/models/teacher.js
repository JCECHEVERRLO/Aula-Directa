'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });

      Teacher.hasMany(models.Classgrade, {
        foreignKey: 'teacher_id',
        as: 'classgrades',
      });
    }
  }

  Teacher.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: true,
    underscored: false,
  });

  return Teacher;
};
