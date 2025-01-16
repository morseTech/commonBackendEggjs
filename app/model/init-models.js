var DataTypes = require("sequelize").DataTypes;
var _card = require("./card");
var _category = require("./category");
var _spidertask = require("./spidertask");

function initModels(sequelize) {
  var card = _card(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var spidertask = _spidertask(sequelize, DataTypes);


  return {
    card,
    category,
    spidertask,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
