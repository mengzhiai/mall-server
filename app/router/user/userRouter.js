/*
 * @Date: 2020-12-24 23:08:46
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-09 23:28:14
 * @FilePath: \mall-server\app\router\user\userRouter.js
 */

const Router = require('koa-router');
let userRouter = new Router({prefix: '/user'});

let user = require('../../controller/userController')

// 登录
userRouter.post('/login', user.login);
//
userRouter.get('/list', user.getList);

// 注册
userRouter.post('/register', user.register)

module.exports = userRouter;
