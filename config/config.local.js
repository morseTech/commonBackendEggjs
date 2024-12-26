/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const os = require('os');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123456';
  // logger
  config.logger = {
    level: 'ON', // log level
  };

  // 自定义部分
  const userConfig = {};

  // 配置暴露的IP
  userConfig.cluster = {
    listen: {
      hostname: '127.0.0.1',
      port: 7001,
    },
  };

  // 跨域配置
  userConfig.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  userConfig.cors = {
    origin: '*',
    // origin: 'http://127.0.0.1:7001',
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 上传配置
  userConfig.upload = {
    tokenExpiresIn: 10, // 上传token有效期 (秒)
  };
  userConfig.multipart = {
    fileSize: '5mb', // 上传文件大小限制
    mode: 'stream',
  };

  // 中间件配置
  userConfig.middleware = [ 'exception' ];
  // 不需要鉴权的路由
  userConfig.auth = {
    allowed: [
      '/',
      '*',
    ],
  };
  // 鉴权jwt设置
  userConfig.jwt = {
    secret: 'commonBackendEggjs_local', // 密钥
    expiresIn: 60 * 60 * 24 * 1000, // 有效期（秒）
  };

  // orm设置
  userConfig.sequelize = require('../libs/sequelize-db/db.config');

  // 静态化配置   访问路径如：http://127.0.0.1:7001/static/images/logo.png
  userConfig.static = {
    domain: 'http://127.0.0.1:7001',
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, './app/web/upload'), // 这里是当前项目目录下的public/upload
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };


  // 隐私配置，不push的部分, 请在config/private.js中配置各种需要保密的apiKey
  userConfig.private = require('./private.js');

  return {
    ...config,
    ...userConfig,
  };
};
