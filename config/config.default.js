/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const HOST = '127.0.0.1';
const PORT = 7001;
const UPLOAD_DIR = './app/public/upload';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = appInfo.name + '_0964776560948769_6748758';

  config.logger = {
    level: 'OFF', // log level
  };

  config.cluster = {
    listen: {
      hostname: HOST,
      port: PORT,
    },
  };

  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*', // 允许所有跨域
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 上传配置
  config.upload = {
    tokenExpiresIn: 10, // 上传token有效期 (秒)
  };
  config.multipart = {
    fileSize: '2mb', // 上传文件大小限制
    mode: 'stream',
  };

  // jwt设置
  config.jwt = {
    secret: 'commonBackendEggjs', // 密钥
    expiresIn: 60 * 60 * 24, // 有效期（秒）
  };

  // orm设置
  config.sequelize = require('../libs/sequelize-db/db.config');

  // 静态化配置   访问路径如：http://127.0.0.1:7001/static/images/logo.png
  config.static = {
    domain: `http://${HOST}:${PORT}`,
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, UPLOAD_DIR), // 上传文件本地路径
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };

  // config.private = require('../private/config.js');

  return {
    ...config,
  };
};
