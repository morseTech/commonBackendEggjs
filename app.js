'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.app.on('request', ctx => {
      ctx.debug('收到请求：', ctx.request.header.host + ctx.request.url);
    });
    this.app.on('response', ctx => {
      // ctx.starttime 是由框架设置的
      ctx.debug(`响应花费 ${Date.now() - ctx.starttime}ms`);
    });
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    // 在应用启动时配置中间件
    this.app.config.coreMiddleware.push('exception');
    // 监听错误事件
    this.app.on('error', (err, ctx) => {
      ctx.debug(err);
    });
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
    // Configure default routes
    const { router } = this.app;

    // Framework default routes
    router.post('/upload-pre', this.app.middleware.preUpload());
    router.post('/upload-transfer', this.app.middleware.transfer());

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
