'use strict';
module.exports = function(sequelize, DataTypes) {
  var plan = sequelize.define('plan', {
    userid: DataTypes.INTEGER,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    budget: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return plan;
};