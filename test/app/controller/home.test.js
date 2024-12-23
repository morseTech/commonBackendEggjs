'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('OK test validate parameters', () => {
  it('validate 测试', () => {
    assert(app.validator);
    assert(app.validate);
    assert(app.rules.user.create);
  });

  it('cache 测试', async () => {
    assert(app.cache);
    assert(await app.cache.set('test', 'test', 10) === 'OK');
    assert(await app.cache.get('test') === 'test');
  });

  it('controller 测试 post /test', async () => {
    return app.httpRequest()
      .post('/test')
      .send({
        name: 'commonBackendEggjs',
        password: '12345678sdfgh',
        email: '123@123.com',
        role: 'user',
      })
      .expect({
        code: 200,
        length: 1,
        data: [ 'commonBackendEggjs' ],
      })
      .expect(200);
    // 也可以这样验证
    // assert(result.status === 200);
  });
});
