/*
 * @Date: 2020-12-24 22:41:34
 * @Description: app.js
 * @LastEditors: jun
 * @LastEditTime: 2021-01-14 23:44:44
 * @FilePath: \mall-server\app.js
 */
const Koa = require('koa');
const app = new Koa();

var koaBody  = require('koa-body');

const path = require('path');

const koaStatic = require('koa-static');


const koajwt = require('koa-jwt');

const session = require('koa-session');

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname, './public')
))

// 请求体中间件
app.use(koaBody());


// token检查
// const tokenCheck = require('./app/middleware/tokenCheck');


app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', /** 默认 */
  maxAge: 86400000, /** cookie的过期时间 【需要修改】*/
  overwrite: true, /** (boolean) can overwrite or not (default true) 没有效果 默认*/
  httpOnly: true, /** true表示只有服务器端可以获取cookie*/
  signed: true, /** 默认 签名 */
  rolling: false, /** 在每次请求时强行设置 cookie,这将重置 cookie 过期时间(默认：false) 【需要修改】*/
  renew: true, /** (boolean) renew session when session is nearly expired 【需要修改】*/
}
app.use(session(CONFIG, app));

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

// app.use(tokenCheck())




app.listen(4000, () => {
  console.log('server');
})
