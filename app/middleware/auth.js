module.exports = (options, app) => {

  // 基于jwt实现的注册用户的token鉴权
  return async (ctx, next) => {

    // 排除不需要验证 token 的路由
    if (options.allowed.indexOf(ctx.request.url) > -1 || options.allowed.indexOf('*') > -1) return await next(options);

    // 获取token
    const tokenKey = app.config.private.TokenFieldName; // 从配置中读取token的键名
    const token = ctx.header[tokenKey];
    if (!token) ctx.authFailed({ msg: '您没有权限访问该接口!', code: 401 });

    // 根据token解密，换取用户信息
    let user = {};
    try {
      user = ctx.jwt.verify(token, app.config.jwt.secret);
    } catch (err) {
      err.name === 'TokenExpiredError'
        ? ctx.authFailed({ msg: 'token 已过期! 请重新获取令牌', code: 307 })
        : ctx.authFailed({ msg: 'Token 令牌不合法!', code: 307 });
    }

    // 把 user 信息挂载到全局ctx上
    user.user_id = user.id; // 解决修改user_id后需要全盘修改的问题
    user.token = token;
    ctx.auth = { user };
    await next(options);
  };
};
