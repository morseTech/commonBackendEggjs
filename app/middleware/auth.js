module.exports = (options, app) => {

  // 基于jwt实现的注册用户的token鉴权
  return async (ctx, next) => {

    // 获取token
    const tokenKey = (app.config.private && app.config.private.TokenFieldName) ? app.config.private.TokenFieldName : 'cbegg-token'; // 从配置中读取token的键名
    const token = ctx.header[tokenKey];
    if (!token) ctx.authFailed({ msg: '您没有足够权限访问接口!', code: 401 });

    // 根据token解密，换取用户信息
    let user = {};
    try {
      user = ctx.jwt.verify(token, app.config.jwt.secret);
    } catch (err) {
      err.name === 'TokenExpiredError'
        ? ctx.authFailed({ msg: '已过期，请重新获取令牌', code: 307 })
        : ctx.authFailed({ msg: '令牌不合法!', code: 307 });
    }

    // 把 user 信息挂载到全局ctx上
    user.token = token;
    ctx.auth = { user };
    await next(options);
  };
};
