/*
 * @Date: 2020-12-24 23:07:35
 * @Description: 路由首页
 * @LastEditors: jun
 * @LastEditTime: 2021-03-13 13:48:36
 * @FilePath: \mall-server\app\router\index.js
 */


const Router = require('koa-router');
const router = new Router();


// 用户管理
const userRouter = require('./user/userRouter');

// 商品管理
const {productRouter, classifyRouter} = require('./shop/productRouter');

// 公用路由
const commonRouter = require('./common');


router.use(commonRouter.routes());
router.use(userRouter.routes());
router.use(productRouter.routes());
router.use(classifyRouter.routes());

module.exports = router;