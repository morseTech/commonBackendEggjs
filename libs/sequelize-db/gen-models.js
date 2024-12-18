'use strict';
const db = require('./db.config.js');
const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(db.database, db.username, db.password, {
  host: db.hostname,
  dialect: db.dialect,
  directory: db.modelsPath, // where to write files
  port: db.port,
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
