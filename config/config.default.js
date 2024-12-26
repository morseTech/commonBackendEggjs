/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const os = require('os');
const LOCALIP = function() {
  const networks = os.networkInterfaces();
  for (const network in networks) {
    for (const net of networks[network]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
}();

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
  config.keys = appInfo.name + '_1682650998331_7872';
  // logger
  config.logger = {
    level: 'OFF', // log level
  };

  // 自定义部分
  const userConfig = {};

  // 配置暴露的IP
  userConfig.cluster = {
    listen: {
      hostname: LOCALIP,
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
    fileSize: '10mb', // 上传文件大小限制
    mode: 'stream',
  };

  // 中间件配置
  userConfig.middleware = [ 'exception', 'auth' ];
  // 不需要鉴权的路由
  userConfig.auth = {
    allowed: [
      '/',
      '*',
    ],
  };
  // 鉴权jwt设置
  userConfig.jwt = {
    secret: 'commonBackendEggjs', // 密钥
    expiresIn: 60 * 60 * 24 * 1000, // 有效期（秒）
  };

  // redis配置
  // userConfig.redis = {
  //   client: require('../libs/redis/redis.config'),
  // };

  // orm设置
  userConfig.sequelize = require('../libs/sequelize-db/db.config');

  // 静态化配置   访问路径如：http://127.0.0.1:7001/static/images/logo.png
  userConfig.static = {
    domain: `http://${LOCALIP}:7001`,
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, './public/upload'), // 这里是当前项目目录下的public/upload
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };


  // 隐私配置，不push的部分
  userConfig.private = require('./private.js');

  return {
    ...config,
    ...userConfig,
  };
};
