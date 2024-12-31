'use strict';
const redis = require('redis');
const conf = require('./redis.config.js');
conf.hostname = conf.host;


const Cache = class {
  constructor() {
    if (!Cache.client) {
      // 连接 Redis
      // const client = redis.createClient({ host: conf.hostname, port: conf.port });
      const client = redis.createClient({ url: `redis://${conf.hostname}:${conf.port}` });

      client.on('error', function(error) {
        console.error(error);
      });

      client.connect();

      Cache.client = client;
    }
  }

  /**
         * 设置 redis 缓存
         * @param { String } key 键
         * @param {String | Object | array} value 值
         * @param { Number } expir 过期时间 单位秒
         * @return { String } 返回成功字符串'OK'
         */
  async set(key, value, expir = 0) {
    if (expir === 0) {
      return await Cache.client.set(key, JSON.stringify(value));
    }
    return await Cache.client.set(key, JSON.stringify(value), 'EX', expir);
  }

  /**
         * 获取 redis 缓存
         * @param { String } key 键
         * @return { String | array | Object } 返回获取的值
         */
  async get(key) {
    const data = await Cache.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  /**
         * 删除 redis 缓存
         * @param { String } key 键
         * @return { Number } 返回删除成功的数量
         */
  async del(key) {
    return await Cache.client.del(key);
  }

  /**
         * 关闭 redis 缓存
          * @return { void }
         */
  async destroy() {
    if (Cache.client) {
      Cache.client.quit();
      delete Cache.client;
    }
  }
};

module.exports = conf.enable ? Cache : undefined;
