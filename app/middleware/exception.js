module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = {
        code: err.status || 500,
        msg: err.message,
        detail: err,
      };
    }
  };
};
