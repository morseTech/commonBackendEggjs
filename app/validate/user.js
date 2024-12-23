'use strict';

// 通用规则片段
const commonRules = {
  id: { type: 'string', format: /^[0-9a-fA-F]{24}$/ },
  page: { type: 'number', min: 1, default: 1 },
  pageSize: { type: 'number', min: 1, max: 100, default: 10 },
};

// 具体业务规则
module.exports = {

  // 创建用户规则
  create: {
    name: { type: 'string', required: true, min: 2, max: 20 },
    password: { type: 'string', required: true, min: 6, max: 20 },
    email: { type: 'email', required: true },
    role: { type: 'enum', values: [ 'admin', 'user' ], default: 'user' },
  },

  // 更新用户规则
  update: {
    id: commonRules.id,
    username: { type: 'string', min: 2, max: 20 },
    email: { type: 'email' },
  },

  // 查询列表规则
  list: {
    page: commonRules.page,
    pageSize: commonRules.pageSize,
    role: { type: 'enum', values: [ 'admin', 'user' ] },
  },

};
