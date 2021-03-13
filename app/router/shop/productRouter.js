/*
 * @Date: 2021-01-25 23:04:51
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-03-13 13:59:20
 * @FilePath: \mall-server\app\router\shop\productRouter.js
 */
const Router = require('koa-router');
let productRouter = new Router({prefix: '/product'});
let classifyRouter = new Router({prefix: '/classify'});

const {productController, classifyController} = require('../../controller/productController');

// 获取商品列表
productRouter.get('/list', productController.list);

// 添加商品
productRouter.post('/add', productController.add);

// 商品详情
productRouter.get('/detail', productController.detail);

// 更新商品
productRouter.post('/update', productController.update);

// 删除商品
productRouter.post('/delete', productController.delete);


/* --商品分类-- */
classifyRouter.get('/list', classifyController.list);
classifyRouter.post('/add', classifyController.add);
classifyRouter.get('/goodsList', classifyController.goodsList);


module.exports = {
  productRouter,
  classifyRouter
}