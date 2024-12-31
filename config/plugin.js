'use strict';

/** @type Egg.EggPlugin */
module.exports = {

  // orm插件
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // jwt用于token处理
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
