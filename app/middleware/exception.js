module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 触发应用层的错误事件
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      ctx.body = {
        code: status,
        msg: err.message,
        detail: ctx.app.config.env === 'prod' ? {} : err,
      };
    }
  };
};
