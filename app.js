/*
 * @Date: 2020-12-24 22:41:34
 * @Description: app.js
 * @LastEditors: jun
 * @LastEditTime: 2021-01-04 23:49:13
 * @FilePath: \mall-server\app.js
 */
const Koa = require('koa');
const app = new Koa();


var koaBody  = require('koa-body');

const path = require('path');

const koaStatic = require('koa-static');



// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname, './public')
))


// 请求体中间件
app.use(koaBody());

// 使用路由中间件
const routers = require('./app/router');
app.use(routers.routes()).use(routers.allowedMethods());



app.listen(3000, () => {
  console.log('server');
})
