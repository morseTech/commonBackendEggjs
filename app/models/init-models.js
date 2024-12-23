const DataTypes = require('sequelize').DataTypes;
const _identifiercard = require('./identifiercard');
const _identifierchain = require('./identifierchain');

function initModels(sequelize) {
  const identifiercard = _identifiercard(sequelize, DataTypes);
  const identifierchain = _identifierchain(sequelize, DataTypes);

  identifiercard.belongsTo(identifierchain, { as: 'chain', foreignKey: 'chainId' });
  identifierchain.hasMany(identifiercard, { as: 'identifiercards', foreignKey: 'chainId' });

  return {
    identifiercard,
    identifierchain,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
