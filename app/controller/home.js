'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {

  async index() {
    await this.service.common.index();
  }

}
module.exports = HomeController;
