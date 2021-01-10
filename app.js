/*
 * @Date: 2020-12-24 22:41:34
 * @Description: app.js
 * @LastEditors: jun
 * @LastEditTime: 2021-01-11 00:14:20
 * @FilePath: \mall-server\app.js
 */
const Koa = require('koa');
const app = new Koa();

var koaBody  = require('koa-body');

const path = require('path');

const koaStatic = require('koa-static');


const koajwt = require('koa-jwt');

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname, './public')
))


// 请求体中间件
app.use(koaBody());

// 使用路由中间件
const routers = require('./app/router');
app.use(routers.routes()).use(routers.allowedMethods());



// 验证token
app.use((ctx, next) => {
  console.log(next);
  return next().catch((err) => {
      if(err.status === 401){
        ctx.body = {
          code: 401,
          message: '非法用户请求,请重新登录'
        }
      }else{
          throw err;
      }
  })
})

app.use(koajwt({
  secret: 'token'
}).unless({
  path: [/\/user\/login/]
}));


app.listen(4000, () => {
  console.log('server');
})
