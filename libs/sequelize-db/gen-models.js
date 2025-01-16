'use strict';

const conf = require('../../config/config.default.js')();
const config = conf?.sequelize || require('./db.config.js');

const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  directory: config.modelsPath, // where to write files
  port: config.port,
  caseModel: 'o', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'o', // file names created for each model use camelCase.js not snake_case.js
  singularize: false, // convert plural table names to singular model names
  additional: {
    timestamps: false,
    freezeTableName: true,
    // ...options added to each model
  },
  // tables: ['table1', 'table2', 'myschema.table3'] // use all tables, if omitted
  // ...
});

auto.run();
