/*
 * @Date: 2020-12-24 22:41:34
 * @Description: app.js
 * @LastEditors: jun
 * @LastEditTime: 2020-12-24 23:16:34
 * @FilePath: \mall-server\app.js
 */
const Koa = require('koa');
const app = new Koa();



// 使用路由中间件
const routers = require('./app/router');


app.use(routers.routes()).use(routers.allowedMethods());


app.listen(3000, () => {
  console.log('server');
})
