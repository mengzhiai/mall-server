/*
 * @Date: 2020-12-24 23:08:46
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2020-12-24 23:21:59
 * @FilePath: \mall-server\app\router\module\userRouter.js
 */

const Router = require('koa-router');

let userRouter = new Router();

userRouter.get('/test', ctx => {
  ctx.body = '测试';
})

module.exports = userRouter;
