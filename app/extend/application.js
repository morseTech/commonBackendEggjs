'use strict';

const path = require('path');
const fs = require('fs');

const RULES = Symbol('Application#rules');
const CACHE = Symbol('Application#cache');


module.exports = {
  get rules() {
    if (!this[RULES]) {
      this[RULES] = {};
      const validatePath = path.join(this.baseDir, 'app/validate');

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

  validate(rulePath, params) {
    const parts = rulePath.split('.');
    let rule = this.rules;
    
    // 逐层访问规则对象
    for (const part of parts) {
      rule = rule[part];
      if (!rule) {
        throw new Error(`Validation rule ${rulePath} not found`);
      }
    }

    return this.validator.validate(rule, params);
  },

  get cache() {
    if (!this[CACHE]) {
      const Cache = require(path.join(this.baseDir, './libs/redis/Cache.js'));
      this[CACHE] = new Cache();
    }
    return this[CACHE];
  },
};
