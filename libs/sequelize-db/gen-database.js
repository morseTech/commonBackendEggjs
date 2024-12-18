'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('./db.config.js');
config.host = config.hostname;

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modelsPath = path.join(__dirname, config.modelsPath);

fs
  .readdirSync(modelsPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (file !== 'init-models.js');
  })
  .forEach(file => {
    const model = require(path.join(modelsPath, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
    model.sync();
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

