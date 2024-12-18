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

3. 上传与静态配置
上传时用户端需先发送请求获取uploadToken,后将token携带在头部发送传输请求
在设置中可以设置静态文件访问地址、上传token时间限制、上传文件大小限制

token请求
curl --location --request POST 'http://192.168.5.99:7001/get-upload-token' \
--header 'upload_files: [{"filename":"a.png","filesize":1024},{"filename":"b.png","filesize":2024}]' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Accept: */*' \
--header 'Host: 192.168.5.99:7001' \
--header 'Connection: keep-alive'

传输请求
curl --location --request POST 'http://192.168.5.99:7001/upload-transfer' \
--header 'upload_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjp7ImZpbGVuYW1lIjoiYS5wbmciLCJmaWxlc2l6ZSI6MTAyNH0sIjEiOnsiZmlsZW5hbWUiOiJiLnBuZyIsImZpbGVzaXplIjoyMDI0fSwiaWF0IjoxNzM0NTMxNTM2LCJleHAiOjE3MzQ1MzIxMzZ9.7pwbm3gyXGFTbSLqIZanH8WnPgXMm-ShufPfv7j05qs' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Accept: */*' \
--header 'Host: 192.168.5.99:7001' \
--header 'Connection: keep-alive' \
--header 'Content-Type: multipart/form-data; boundary=--------------------------109685442555590268310526' \
--form 'filename=@"E:\\小妞\\未标题-1.png"'