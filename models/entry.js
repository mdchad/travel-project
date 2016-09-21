'use strict';
module.exports = function(sequelize, DataTypes) {
  var entry = sequelize.define('entry', {
    country: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.entry.hasMany(models.list);
      }
    }
  });
  return entry;
};
