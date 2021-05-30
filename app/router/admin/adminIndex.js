/*
 * @Date: 2020-12-24 23:07:35
 * @Description: admin首页
 * @LastEditors: jun
 * @LastEditTime: 2021-03-13 13:48:36
 * @FilePath: \mall-server\app\router\index.js
 */


const Router = require('koa-router');
const adminRouter = new Router();


// 用户管理
const userRouter = require('./user/userRouter');

// 商品管理
const {productRouter, classifyRouter} = require('./shop/productRouter');

// 公用路由
const commonRouter = require('./common');


adminRouter.use(commonRouter.routes());
adminRouter.use(userRouter.routes());
adminRouter.use(productRouter.routes());
adminRouter.use(classifyRouter.routes());

module.exports = adminRouter;