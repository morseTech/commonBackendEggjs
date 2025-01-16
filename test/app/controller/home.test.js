'use strict';
const path = require('path');
const { app, assert } = require('egg-mock/bootstrap');

describe('开始测试。。。。。。', () => {
  let ctx;

  beforeEach(() => {
    // 创建测试 ctx
    ctx = app.mockContext();
  });

  it('spider 测试', async () => {
    assert(app.Spider);
    const spider = await new app.Spider().create();
    const html = await spider.fetch('https://www.baidu.com');
    assert(app.Spider.Filter);
    const filter = new app.Spider.Filter(html)
    const result = filter.match(/<title>(.*?百度.*?)<\/title>/);
    assert(result && result.includes('百度'));
    const result1 = filter.find({ selector: 'img.index-logo-src', attr: 'src' });
    assert(result1.indexOf('//www.baidu.com/img') > -1);
  });

  it('orm 测试', async () => {
    assert(app.model);
    assert(app.model.Sequelize);
    assert(ctx.model);
    const cards = await app.model.card.findAll();
    console.log(cards[0].name);
  });

  it('validate 测试', () => {
    assert(app.validator);
    assert(app.validate);
    assert(app.rules.user.create);
    assert(app.validate('user.update', { username: 'test111111111111' }));
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
