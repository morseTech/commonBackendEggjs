// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {

  // 基于jwt实现的上传的token鉴权
  return async (ctx, next) => {
    // 获取token
    const { uptk = '' } = ctx.header;
    if (!uptk) ctx.authFailed({ msg: '您没有权限访问该接口!', code: 401 });

    // 验证token的有效性
    let upload = {};
    try {
      upload = ctx.jwt.verify(uptk, ctx.auth.user.user_id);
    } catch (err) {
      ctx.authFailed({ msg: 'Upload 令牌不合法!', code: 307 });
    }

    // 把上传信息信息挂载到全局ctx上
    ctx.auth.upload = upload;
    await next(options);
  };
};
