/*
 * @Date: 2021-07-04 01:13:59
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-04 02:19:18
 * @FilePath: \mall-server\app\router\admin\carousel\carouselRouter.js
 */
const Router = require('koa-router');
let carouselRouter = new Router({ prefix: '/carousel' });

const { bannerController } = require('../../../controller/admin/carouselController.js');

carouselRouter.get('/banner/list', bannerController.list);


module.exports = {
  carouselRouter
}