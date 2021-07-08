/*
 * @Date: 2021-07-04 01:13:59
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-08 23:59:28
 * @FilePath: \mall-server\app\router\admin\carousel\carouselRouter.js
 */
const Router = require('koa-router');
let carouselRouter = new Router({ prefix: '/carousel' });

const { bannerController } = require('../../../controller/admin/carouselController.js');

// 获轮播图列表
carouselRouter.get('/banner/list', bannerController.list);

// 添加轮播图
carouselRouter.post('/banner/add', bannerController.add);

// 轮播图详情
carouselRouter.get('/banner/:id', bannerController.detail);

// 更新轮播图
carouselRouter.put('/banner/update', bannerController.update);

// 删除轮播图
carouselRouter.delete('/banner/:id', bannerController.delete);


module.exports = {
  carouselRouter
}