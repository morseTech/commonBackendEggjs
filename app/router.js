'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/test', controller.home.test);
  // 上传预检
  router.post('/upload-pre', app.middleware.preUpload());
  // 上传
  router.post('/upload-transfer', app.middleware.transfer());


};
