'use strict';
const path = require('path');
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('OK test validate parameters', () => {
  before(() => {
    // 确保使用 local 环境配置
    mock.env('local');
  });

  it('config 测试', () => {
    const { config } = app;
    console.log('Environment:', app.config.env);
    console.log('Static Config:', config.static);
    
    // 验证配置是否正确合并
    assert(config.static.domain === 'http://127.0.0.1:7001');
    assert(config.static.prefix === '/static/');
    assert(config.static.dir === path.join(app.baseDir, './app/web/upload'));
  });

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
