'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    static associate(models) {
      // define associations here
    }
  }
  Grade.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Grade',
    tableName: 'grades',
    timestamps: true,
  });

  return Grade;
};
