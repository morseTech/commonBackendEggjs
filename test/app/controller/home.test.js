'use strict';
const path = require('path');
const { app, assert } = require('egg-mock/bootstrap');

describe('OK test validate parameters', () => {
  it('validate 测试', () => {
    assert(app.validator);
    assert(app.validate);
    assert(app.rules.user.create);
    assert(app.validate('user.update', { username: 'test' }));
  });

  it('cache 测试', async () => {
    assert(app.cache);
    assert(await app.cache.set('test', 'test', 10) === 'OK');
    assert(await app.cache.get('test') === 'test');
  });

  it('上传预请求和文件上传 测试', async () => {
    // 上传预请求
    const preRes = await app.httpRequest()
      .post('/upload-pre')
      .send({
        files: [{
          filename: 'logo.png',
          filesize: 102400,
        }],
      })
      .expect(200);

    const token = preRes.body.data[0].token;
    assert(token);

    // 文件上传
    const filePath = path.join(__dirname, 'fixtures/logo.png');
    await app.httpRequest()
      .post('/upload-transfer')
      .set('Upload-Token', token)
      .type('multipart/form-data')
      .attach('file', filePath)
      .expect(200)
      .then(response => {
        assert(response.body.code === 200);
      });
  });
});
