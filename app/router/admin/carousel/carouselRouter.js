/*
 * @Date: 2021-07-04 01:13:59
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-07 00:58:00
 * @FilePath: \mall-server\app\router\admin\carousel\carouselRouter.js
 */
const Router = require('koa-router');
let carouselRouter = new Router({ prefix: '/carousel' });

const { bannerController } = require('../../../controller/admin/carouselController.js');

// 获轮播图列表
carouselRouter.get('/banner/list', bannerController.list);

// 添加轮播图
carouselRouter.post('/banner/add', bannerController.add)


module.exports = {
  carouselRouter
}