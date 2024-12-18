// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {

  // 基于jwt实现的上传的token鉴权
  return async (ctx, next) => {
    // 获取token
    const { upload_token = '' } = ctx.header;
    const uptk = upload_token;
    if (!uptk) ctx.authFailed({ msg: '您没有权限访问上传接口!', code: 401 });

    // 验证upload token的有效性
    const upload = [];
    try {
      const uploads = ctx.jwt.verify(uptk, 'secretKey');
      Object.values(uploads).forEach(v => { (typeof v !== 'number') && upload.push(v.filename); });
    } catch (err) {
      ctx.authFailed({ msg: 'Upload 令牌不合法!', code: 307 });
    }

    // 把上传信息信息挂载到全局ctx上
    ctx.uploads = upload;
    await next(options);
  };
};
