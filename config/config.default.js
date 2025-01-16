/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
const { enable } = require('../libs/redis/redis.config');
const HOST = '127.0.0.1';
const PORT = 7001;
const UPLOAD_DIR = '../app/public/upload';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.keys = '_cbegg_0964776560948769_6748758';

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

  // jwt设置
  config.jwt = {
    secret: 'commonBackendEggjs_V&^%RYI', // 密钥
    expiresIn: 60 * 60 * 24, // 有效期（秒）
  };

  // orm设置
  config.sequelize = {
    // model的存储路径
    modelsPath: path.join(__dirname, '../app/model'),
    // 测试开发数据库
    enable: true,
    dialect: 'mysql',
    database: 'momlink',
    username: 'hongfu',
    password: '123456',
    host: '127.0.0.1',
    hostname: '127.0.0.1',
    port: '3306',
    // 是否创建新表
    sync: true,
    // 中国时区
    timezone: '+08:00',
    // 个性化配置
    define: {
      // 取消数据表名复数
      freezeTableName: true,
      // 自动写入时间戳 created_at updated_at
      timestamps: false,
      // 字段生成软删除时间戳 deleted_at
      paranoid: false,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      // 所有驼峰命名格式化
      underscored: false,
    },
  };

  // cache设置
  config.redis = {
    enable: true, // 是否加载cache
    port: 6379,
    host: '127.0.0.1',
    password: 'auth',
    db: 0,
  };

  config.validate = {
    // 转换配置
    convert: true, // 自动类型转换
    // 验证配置
    validateRoot: true, // 校验根对象
    widelyUndefined: true, // undefined/null 等价
    // 错误配置
    throwError: true, // 抛出异常而不是返回错误对象
  };

  // 上传配置
  config.multipart = {
    enable: true,
    tokenExpiresIn: 3, // 上传token有效期 (秒)
    fileSize: '2mb', // 上传文件大小限制
    mode: 'stream',
  };

  // 静态化配置   访问路径如：http://127.0.0.1:7001/static/images/logo.png
  config.static = {
    domain: `http://${HOST}:${PORT}`,
    prefix: '/static/',
    dir: path.join(__dirname, UPLOAD_DIR), // 上传文件本地路径
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
  };

  // spider配置
  config.spider = {
    enable: true,
  };

  // config.private = require('../private/config.js');

  return {
    ...config,
  };
};
