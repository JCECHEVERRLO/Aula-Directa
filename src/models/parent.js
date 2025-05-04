'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    static associate(models) {
      // A Parent belongs to a User
      Parent.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  Parent.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Parent',
    tableName: 'parents',
    timestamps: true,
  });

  return Parent;
};
