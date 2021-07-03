/*
 * @Date: 2020-12-24 23:07:35
 * @Description: admin首页
 * @LastEditors: jun
 * @LastEditTime: 2021-07-04 01:22:35
 * @FilePath: \mall-server\app\router\admin\adminIndex.js
 */


const Router = require('koa-router');
const adminRouter = new Router();

// 公用路由
const commonRouter = require('./common');

// 用户管理
const userRouter = require('./user/userRouter');

// 商品管理
const { productRouter, classifyRouter } = require('./shop/productRouter');

// 轮播图管理
const { carouselRouter } = require('./carousel/carouselRouter');



adminRouter.use(commonRouter.routes());
adminRouter.use(userRouter.routes());
adminRouter.use(productRouter.routes());
adminRouter.use(classifyRouter.routes());
adminRouter.use(carouselRouter.routes());

module.exports = adminRouter;