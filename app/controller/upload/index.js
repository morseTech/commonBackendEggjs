'use strict';

const { Controller } = require('egg');

class UploadController extends Controller {

  // 许可上传 有效期120秒
  async permission_upload(filesInfo) {
    const { ctx, config, app } = this;
    // 判断每一个文件是否超限
    const files = {};
    let i = 0;
    filesInfo.forEach(f => {
      const { filename, filesize } = f;
      if (filesize > config.multipart.fileSize) ctx.requestFailed(new Error(`${filename}文件大小超限`));
      files[i] = f;
      i++;
    });
    const uptk = app.jwt.sign(files, 'secretKey', { expiresIn: config.upload.tokenExpiresIn });
    return uptk;
  }

  // 上传文件
  async upload(files) {
    const { ctx, config } = this;
    const fs = require('fs');
    const path = require('path');
    // 故名思意 异步二进制 写入流
    const awaitWriteStream = require('await-stream-ready').write;
    // 管道读入一个虫洞。
    const sendToWormhole = require('stream-wormhole');

    // 资源保存路径
    const destDir = path.join(config.static.dir, './');
    // 判断路径是否存在，如不存在生成
    fs.existsSync(destDir) || fs.mkdirSync(destDir);
    const parts = ctx.multipart();
    let part;
    const result = [];
    while ((part = await parts()) && part !== null) {
      if (part.length) {
        // 处理其他参数，其他参数以数组形式接收
        // console.log(part);
      } else {
        // ctx.debug(files);
        // ctx.debug(part);
        if (!part.filename) {
          continue;
        }
        !files.includes(part.filename) && ctx.requestFailed(new Error(`${part.filename}非合法文件`));
        let filename,
          target;
        do {
          filename = 'upload' + Date.now() + parseInt(Math.random() * 10000) + path.extname(part.filename).toLocaleLowerCase();
          // 目标文件
          target = path.join(destDir, filename);
        } while (fs.existsSync(target));
        // 创建管道
        const writeStream = fs.createWriteStream(target);
        try {
          // console.log(target);
          // console.log(part);
          // 异步把文件流 写入
          await awaitWriteStream(part.pipe(writeStream));
          // 静态资源访问路径
          const staticUrl = config.static.domain + config.static.prefix + filename;
          result.unshift(staticUrl);
        } catch (err) {
          // 如果出现错误，关闭管道
          await sendToWormhole(part);
          // 异常处理
          ctx.requestFailed(new Error('上传故障'));
        }
      }
    }
    // 返回结果
    return result.reverse();
  }

  // 文章图片上传预检
  async getUploadToken(ctx) {
    // 前端发送请求参数upload_info需要通过头部携带
    const { upload_files = '' } = ctx.header;
    if (!upload_files) ctx.authFailed({ msg: '上传请求接口限制!', code: 401 });
    const filesInfo = JSON.parse(upload_files);
    ctx.success({ token: await this.permission_upload(filesInfo) });
  }

  // 文件上传
  async transfer(ctx) {
    const uploads = ctx.uploads;
    const post = await this.upload(uploads);
    ctx.success(post);
  }

}
module.exports = UploadController;
