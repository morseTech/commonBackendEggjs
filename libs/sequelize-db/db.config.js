// 数据库配置
'use strict';
module.exports = {
  // model的存储路径
  modelsPath: '../../app/models',
  // 测试开发数据库
  enable: true,
  dialect: 'mysql',
  database: 'momlink',
  username: 'root',
  password: '123456',
  host: '127.0.0.1',
  hostname: '127.0.0.1',
  port: '3306',
  // 是否创建新表
  sync: true,
  // 中国时区
  timezone: '+08:00',
  // 个性化配置
  define: {
    // 取消数据表名复数
    freezeTableName: true,
    // 自动写入时间戳 created_at updated_at
    timestamps: false,
    // 字段生成软删除时间戳 deleted_at
    paranoid: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 所有驼峰命名格式化
    underscored: false,
  },
};
