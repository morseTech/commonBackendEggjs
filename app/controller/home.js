'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {

  async index() {
    await this.service.common.index();
  }

  async test() {
    const { ctx, app } = this;
    const errors = app.validate('user.create', ctx.request.body);
    if (errors) {
      ctx.validateFailed(errors);
    }
    ctx.success(ctx.request.body.name);
  }

}
module.exports = HomeController;
