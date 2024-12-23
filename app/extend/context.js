
// 此处只提供阻塞式方法
module.exports = {
  get jwt() {
    return this.app.jwt;
  },
  // 调试函数
  debug() {
    const origLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 2;
    const err = new Error();
    const stack = err.stack;
    Error.stackTraceLimit = origLimit;
    const filename = stack.split('\n')[2];
    console.debug('<<<---Debug START--->>>');
    console.debug(filename);
    for (let i = 0; i < arguments.length; i++) {
      console.debug(typeof arguments[i]);
      console.debug(arguments[i]);
    }
    console.debug('<<<---END Debug--->>>');
  },

  // 字符串加密
  hash(str) {
    const crypto = require('crypto');
    const sha256 = crypto.createHash('sha256');
    sha256.update(str);
    return sha256.digest('hex');
  },

  // 生成token
  generateToken(user) {
    const { expiresIn } = this.app.config.jwt;
    return this.app.jwt.sign(user, this.app.config.jwt.secret, { expiresIn });
  },

  // 返回成功响应
  success(data) {
    const body = {};
    body.code = 200;
    if (data === null || typeof data === 'undefined') {
      body.code = 404;
      data = [];
    } else if (Array.isArray(data)) {
      body.length = data.length;
      if (data.length === 0) body.code = 404;
    } else {
      body.length = 1;
      data = [ data ];
    }
    body.data = data;
    this.body = body;
  },

  // 返回空响应
  empty() {
    this.body = {
      code: 404,
      length: 0,
      data: [],
    };
  },

  // 抛出校验失败异常
  validateFailed(errors) {
    const err = new Error('参数错误');
    err.status = 422;
    err.errors = errors;
    throw err;
  },

  // 抛出鉴权失败异常
  authFailed(errors) {
    const err = new Error('鉴权失败');
    err.status = 416;
    err.errors = errors;
    throw err;
  },

  // 抛出操作不成功异常
  requestFailed(errors) {
    if (errors instanceof Error) {
      throw errors;
    } else {
      const err = new Error();
      err.status = 500;
      err.message = '操作失败' || errors.message || errors.msg;
      throw err;
    }
  },
};
