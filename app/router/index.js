/*
 * @Date: 2020-12-24 23:07:35
 * @Description: 路由首页
 * @LastEditors: jun
 * @LastEditTime: 2021-01-25 23:24:11
 * @FilePath: \mall-server\app\router\index.js
 */


const Router = require('koa-router');
const router = new Router();

// 用户管理
const userRouter = require('./user/userRouter');

// 商品管理
const productRouter = require('./shop/productRouter');

router.use(userRouter.routes());
router.use(productRouter.routes());

module.exports = router;