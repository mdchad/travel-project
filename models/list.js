'use strict';
module.exports = function(sequelize, DataTypes) {
  var list = sequelize.define('list', {
    day: DataTypes.INTEGER,
    activity: DataTypes.TEXT,
    username: DataTypes.STRING,
    entryId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      models.list.belongsTo(models.entry);      }
    }
  });
  return list;
};
