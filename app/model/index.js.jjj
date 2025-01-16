module.exports = app => {
  const models = require('../models/init-models')(app.model);

  // 如果没有则新建表格
  // const versions = new Set([ 1.0 ]);
  // const currentVersion = 1.0;
  // if (!versions.has(currentVersion)) {
  //   Object.keys(models).forEach(n => models[n].sync());
  // }

  return models;
};
