/*
 * @Date: 2020-12-24 23:07:35
 * @Description: 路由首页
 * @LastEditors: jun
 * @LastEditTime: 2020-12-24 23:19:41
 * @FilePath: \mall-server\app\router\index.js
 */


const Router = require('koa-router');
const router = new Router();

const userRouter = require('./module/userRouter');

router.use(userRouter.routes());

module.exports = router;