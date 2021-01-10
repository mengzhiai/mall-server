/*
 * @Date: 2020-12-24 23:08:46
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-10 23:58:05
 * @FilePath: \mall-server\app\router\module\userRouter.js
 */

const Router = require('koa-router');
let userRouter = new Router();

let userController = require('../../controller/userController')

// 登录
userRouter.post('/users/login', userController.login)
userRouter.get('/users/list', userController.list)

module.exports = userRouter;
