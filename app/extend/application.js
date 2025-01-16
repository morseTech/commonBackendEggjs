'use strict';

const path = require('path');
const fs = require('fs');
const Parameter = require('parameter');

const VALIDATOR = Symbol('Application#validator');
const RULES = Symbol('Application#rules');
const VALIDATE = Symbol('Application#validate');

const CACHE = Symbol('Application#cache');

const ORM = Symbol('Application#ORM');

const SPIDER = Symbol('Application#SPIDER');

const extension = {

  get validator() {
    if (!this[VALIDATOR]) {
      this[VALIDATOR] = new Parameter(this.config.validate);
    }
    return this[VALIDATOR];
  },

  get rules() {
    if (!this[RULES]) {
      this[RULES] = {};
      const validatePath = path.join(this.baseDir, './app/validate');

      if (fs.existsSync(validatePath)) {
        const files = fs.readdirSync(validatePath);
        files.forEach(file => {
          if (file.endsWith('.js')) {
            const ruleName = path.basename(file, '.js');
            this[RULES][ruleName] = require(path.join(validatePath, file));
          }
        });
      }
    }
    return this[RULES];
  },

  /**
   * 验证参数
   * @param {String} rulePath 规则路径（如：'user.create'）
   * @param {Object} params 待验证的参数对象
   * @return {Array|null} 验证错误信息数组，验证通过返回null
   */
  get validate() {
    if (!this[VALIDATE]) {
      this[VALIDATE] = (rulePath, params) => {
        const parts = rulePath.split('.');
        let rule = this.rules;
        for (const part of parts) {
          rule = rule[part];
          if (!rule) {
            throw new Error(`Validation rule ${rulePath} not found`);
          }
        }
        return this.validator.validate(rule, params);
      };
    }
    return this[VALIDATE];
  },
};

const config = require('../../config/config.default')();

// 根据配置添加 cache
if (config.redis?.enable) {
  Object.defineProperty(extension, 'cache', {
    get() {
      if (!this[CACHE]) {
        const Cache = require(path.join(this.baseDir, './libs/redis/Cache.js'));
        this[CACHE] = new Cache();
      }
      return this[CACHE];
    },
  });
}

// 根据配置添加 model
if (config.sequelize?.enable) {
  Object.defineProperty(extension, 'model', {
    get() {
      if (!this[ORM]) {
        const models = require(path.join(this.baseDir, './libs/sequelize-db/model.js'));
        this[ORM] = models();
      }
      return this[ORM];
    },
  });
}

// 根据配置添加 spider
if (config.sequelize?.enable) {
  Object.defineProperty(extension, 'Spider', {
    get() {
      if (!this[SPIDER]) {
        const spider = require(path.join(this.baseDir, './libs/spider/Spider.js'));
        spider.Filter = require(path.join(this.baseDir, './libs/spider/HtmlFilter.js'));
        this[SPIDER] = spider;
      }
      return this[SPIDER];
    },
  });
}

module.exports = extension;

