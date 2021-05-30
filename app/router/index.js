const Router = require('koa-router');
const router = new Router();

// admin路由
const adminRouter = require('./admin/adminIndex');

// web路由
const webRouter = require('./web/webIndex');


router.use(adminRouter.routes());
router.use(webRouter.routes());


// 尾部

module.exports = router;