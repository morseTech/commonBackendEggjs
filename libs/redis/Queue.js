'use strict';
const redis = require('redis');
const config = require('../../config/config.default.js');
const conf = config?.redis || require('./redis.config.js');
const chanelListener = {};
const tasks = {};
const Queue = class {
  constructor() {
    if (!Queue.clientP || !Queue.clientS) {
      // 连接 Redis
      const clientP = redis.createClient({ host: conf.host, port: conf.port });
      const clientS = redis.createClient({ host: conf.host, port: conf.port });

      clientP.on('error', function(error) {
        console.error('Publish error:', error);
      });
      clientP.on('ready', function() {
        console.info('publish be ready.........');
      });

      clientS.on('error', function(error) {
        console.error('SubScribe error:', error);
        Object.keys(chanelListener).forEach(function(ch) {
          this.addChanel(ch);
        });
      });


      clientP.connect();
      clientS.connect();

      Queue.clientP = clientP;
      Queue.clientS = clientS;
    }
  }
  addChanel(ch) {
    chanelListener[ch] = function(res) {
      Object.keys(tasks[ch]).forEach(key => {
        const fn = tasks[ch][key].func;
        fn(res);
        if (tasks[ch][key].once) delete tasks[ch][key];
      });
    };

    Queue.clientS.subscribe(ch, chanelListener[ch]);
    console.warn(chanelListener);
  }
  async pub(ch, m) {
    Queue.clientP.publish(ch, m);
  }
  async addSub(ch, n, f, once = false) {
    if (!tasks[ch]) tasks[ch] = {};
    tasks[ch][n] = { once, func: f };
    console.warn(tasks);
  }
  async cancelSub(ch, n) {
    delete tasks[ch][n];
  }
  async destroy() {
    if (Queue.clientP) {
      Queue.clientP.quit();
      delete Queue.clientP;
    }
    if (Queue.clientS) {
      Queue.clientS.quit();
      delete Queue.clientS;
    }
  }
};

module.exports = Queue;
