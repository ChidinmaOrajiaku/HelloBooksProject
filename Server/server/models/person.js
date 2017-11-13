'use strict';
module.exports = (sequelize, DataTypes) => {
  var Person = sequelize.define('Person', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Person;
};