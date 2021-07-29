/*
 * @Date: 2020-12-24 23:07:35
 * @Description: admin首页
 * @LastEditors: jun
 * @LastEditTime: 2021-07-30 01:41:28
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

// 订单管理
const { orderRouter } = require('./order/orderRouter');


adminRouter.use(commonRouter.routes());
adminRouter.use(userRouter.routes());
adminRouter.use(productRouter.routes());
adminRouter.use(classifyRouter.routes());
adminRouter.use(carouselRouter.routes());
adminRouter.use(orderRouter.routes());

module.exports = adminRouter;