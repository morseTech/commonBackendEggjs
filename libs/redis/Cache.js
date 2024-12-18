'use strict';
const redis = require('redis');
const conf = require('./redis.config.js');


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
  async set(k, v, s) {
    await Cache.client.set(k, v);
    if (s) await Cache.client.expire(k, s);
    return v;
  }
  async get(k) {
    const v = await Cache.client.get(k);
    return v;
  }
  async destroy() {
    if (Cache.client) {
      Cache.client.quit();
      delete Cache.client;
    }
  }
};

module.exports = Cache;
