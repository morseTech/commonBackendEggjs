var DataTypes = require("sequelize").DataTypes;
var _identifiercard = require("./identifiercard");
var _identifierchain = require("./identifierchain");

function initModels(sequelize) {
  var identifiercard = _identifiercard(sequelize, DataTypes);
  var identifierchain = _identifierchain(sequelize, DataTypes);

  identifiercard.belongsTo(identifierchain, { as: "chain", foreignKey: "chainId"});
  identifierchain.hasMany(identifiercard, { as: "identifiercards", foreignKey: "chainId"});

  return {
    identifiercard,
    identifierchain,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
