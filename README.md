这是一个基于eggjs实现的通用后端开发框架
基础功能：
1. 数据库
路径 /libs/sequelize-db
依赖 sequelize sequelize-auto
配置 db.config.js
调用 app.model.models.modelName或ctx.model.modelName
规则 modelName完全按照数据表名称命名
扩展功能：
npm run db2model      根据数据表生成models
npm run model2db      根据model创建数据表

2. 日志
ctx 上添加debug方法，控制台打印。可实现手动打印定位输出语句位置
调用 ctx.debug(err)
3. 配置
4. 中间件
5. 路由
6. 控制器
7. 服务
8. 模型
