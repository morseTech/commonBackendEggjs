'use strict';
const path = require('path');
class AppBootHook {
  constructor(app) {
    this.app = app;
    this.app.on('request', ctx => {
      // 记录收到的请求
      // ctx.log('收到请求：', ctx.request.header.host + ctx.request.url);
      // ctx.debug();
    });
    this.app.on('response', ctx => {
      // ctx.starttime 是由框架设置的
      ctx.usedTime = Date.now() - ctx.starttime;
    });
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    // 手动加载sequelize model
    // const Sequelize = require('sequelize');
    // const config = require('./libs/sequelize-db/db.config');
    // this.app.model = new Sequelize(config.database, config.username, config.password, config);
    // const models = require('./libs/sequelize-db/models/init-models')(this.app.model);

    // 加载model关系
    // const relationship = require('./app/model/relationship')();
    // await relationship.setUserLevelRelation(this.app);
    // await relationship.setUserLocationRelation(this.app);
    // await relationship.setPostUserRelation(this.app);
    // await relationship.setPostPost_classRelation(this.app);
    // await relationship.setPostParagraphRelation(this.app);
    // await relationship.setPostLocationRelation(this.app);
    // await relationship.setOrderPostRelation(this.app);
    // await relationship.setOrderUserRelation(this.app);
    // await relationship.setDeliveryUserRelation(this.app);
    // await relationship.setDeliveryOrderRelation(this.app);

    // 加载validate校验规则
    const validatePath = path.join(this.app.baseDir, './app/validate');
    this.app.loader.loadToApp(validatePath, 'validate');
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady() {
    // 应用已经启动完毕

  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例

  }
}

module.exports = AppBootHook;
