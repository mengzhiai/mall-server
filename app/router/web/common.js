const Router = require('koa-router');
let commonRouter = new Router({ prefix: '/web/common' });

const { commonController } = require('../../controller/web/commonController');

// 获取商品列表
commonRouter.get('/headerList', commonController.headerList);

// 获取bannder列表
commonRouter.get('/bannerList', commonController.bannerList);

commonRouter.get('/classifyList', commonController.classifyLitst)


module.exports = commonRouter;