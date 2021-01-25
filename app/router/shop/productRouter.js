/*
 * @Date: 2021-01-25 23:04:51
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-01-25 23:51:30
 * @FilePath: \mall-server\app\router\shop\productRouter.js
 */
const Router = require('koa-router');
let productRouter = new Router({prefix: '/product'});

const productController = require('../../controller/productController');

// 获取商品列表
productRouter.get('/productList', productController.productList);

// 添加商品
productRouter.post('/addProduct', productController.addProduct)

module.exports = productRouter;