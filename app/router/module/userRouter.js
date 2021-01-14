/*
 * @Date: 2020-12-24 23:08:46
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-14 23:24:32
 * @FilePath: \mall-server\app\router\module\userRouter.js
 */

const Router = require('koa-router');
let userRouter = new Router();

let { login, getList } = require('../../controller/userController')

// 登录
userRouter.post('/users/login', login)
userRouter.get('/users/list', getList)

module.exports = userRouter;
