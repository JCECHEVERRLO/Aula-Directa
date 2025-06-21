'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Grade extends Model {
    static associate(models) {
      // define associations here
    }
  }

  Grade.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Grade',
    tableName: 'grades',
    timestamps: true,
    underscored: true // Esto hace match con los campos created_at y updated_at
  });

  return Grade;
};