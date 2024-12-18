'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {

  async index() {
    const { ctx, app } = this;
    console.log(app.model.models);
    ctx.debug(ctx.model.models);
    ctx.success('Common Backend Framework by egg.js');
  }

}
module.exports = HomeController;
