// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {

  return async (ctx, next) => {
    const { files } = ctx.request.body;
    if (!files || !files[0].filename || !files[0].filesize) {
      ctx.authFailed({ msg: '上传预请求参数错误!', code: 401 });
    }
    await ctx.service.common.preUpload();
  };
};
