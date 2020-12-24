/*
 * @Date: 2020-12-24 22:41:34
 * @Description: app.js
 * @LastEditors: jun
 * @LastEditTime: 2020-12-24 23:43:02
 * @FilePath: \mall-server\app.js
 */
const Koa = require('koa');
const app = new Koa();


const koaBody = require('koa-body');

const path = require('path');

const koaStatic = require('koa-static');


// 使用路由中间件
const routers = require('./app/router');
app.use(routers.routes()).use(routers.allowedMethods());


// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname, './public')
))


// 表单中间件
app.use(koaBody());

app.listen(3000, () => {
  console.log('server');
})
