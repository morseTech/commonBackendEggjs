利用sequelize-auto生成models

平时配合egg-sequelize插件使用，无需修改框架的配置文件

功能

根据表生成model
node gen-models.js

根据model创建表
node gen-database.js

如需手动生成model实例
const { createModelInstance } = require('./models');
const models = createModelInstance();