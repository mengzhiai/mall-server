/*
 * @Date: 2020-12-24 23:08:46
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-25 23:04:41
 * @FilePath: \mall-server\app\router\user\userRouter.js
 */

const Router = require('koa-router');
let userRouter = new Router({prefix: '/user'});

let { login, getList, register } = require('../../controller/userController')

// 登录
userRouter.post('/login', login);
//
userRouter.get('/list', getList);

// 注册
userRouter.post('/register', register)

module.exports = userRouter;
