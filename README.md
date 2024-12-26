这是一个基于eggjs实现的通用后端开发框架

通过中间件捕获和ctx.body,统一了后端返回结构

请求正常处理时
status 200
body { "code":200, "length": 1, "data": [ dataObject ] }

异常处理时
status error.status
message "故障提示信息"

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
ctx 上添加debug方法，控制台输出方便调试
可实现手动打印定位输出语句位置
调用 ctx.debug(err)

3. 上传与静态配置
上传时分两步完成,用户端需先发送请求获取uploadToken,后将token携带在头部发送文件。
在设置中可以设置静态文件访问地址、上传token时间限制、上传文件大小限制

4. 参数校验
app上添加了validator和validate，自动加载app/validate目录下的规则文件



