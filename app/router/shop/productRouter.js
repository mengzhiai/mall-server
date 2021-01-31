/*
 * @Date: 2021-01-25 23:04:51
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-02-01 01:18:03
 * @FilePath: \mall-server\app\router\shop\productRouter.js
 */
const Router = require('koa-router');
let productRouter = new Router({prefix: '/product'});

const productController = require('../../controller/productController');

// 获取商品列表
productRouter.get('/list', productController.productList);

// 添加商品
productRouter.post('/add', productController.addProduct);

// 商品详情
productRouter.get('/detail', productController.detail);

// 删除商品
productRouter.post('/delete', productController.delete);

// 查询商品
productRouter.get('/search', productController.search)

module.exports = productRouter;