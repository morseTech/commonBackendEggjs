'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');

class cbeggApplication extends egg.Application {
  get [EGG_PATH]() {
    return path.dirname(__dirname);
  }
}

module.exports = cbeggApplication;
