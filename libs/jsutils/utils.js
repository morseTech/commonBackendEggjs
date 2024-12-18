'use strict';
const rand = require('string-random');
const _ = require('lodash');
const crypto = require('crypto');

const createError = (s, m, d) => {
  const e = new Error();
  e.status = e.code = s;
  e.message = m;
  e.result = d;
  return e;
};

const randomNumber = n => {
  return rand(n, { letters: false });
};

const randomLetters = n => {
  return rand(n, { numbers: false });
};

const randomString = n => {
  return rand(n);
};

const randomStrong = n => {
  return rand(n, { specials: true });
};

const MyError = class extends Error {
  constructor(s, m, d) {
    super();
    this.name = 'MyError';
    this.status = this.code = s;
    this.stack = this.message = m;
    this.data = this.result = d;
  }
};

const uuid = () => {
  return crypto.randomUUID();
};

const hash = (s, k) => {
  return crypto.createHash('sha256', k).update(s).digest('hex');
};

const string36to32 = s => {
  return s.replace(/-/g, '');
};
const string32to36 = s => {
  const ar = s.split('');
  ar.splice(8, 0, '-');
  ar.splice(13, 0, '-');
  ar.splice(18, 0, '-');
  ar.splice(23, 0, '-');
  return ar.join('');
};

module.exports = {
  _,
  createError, // 兼容
  randomNumber, // 数字
  randomLetters, // 字符
  randomString, // 字符数字混合
  randomStrong, // 字符数字符号混合
  MyError, // 自定义Error类
  uuid, // UUID
  hash, // 不可逆加密
  string36to32, // 去除uuid的 ‘-’
  string32to36, // 字符串转uuid格式
};
