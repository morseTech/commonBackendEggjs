'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/test', controller.home.test);
  // 文章图片上传预检
  router.post('/get-upload-token', controller.upload.index.getUploadToken);
  // 文章图片上传
  router.post('/upload-transfer', app.middleware.uploadValidate(), controller.upload.index.transfer);

};
