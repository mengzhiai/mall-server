/*
 * @Date: 2021-01-25 23:04:51
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-03-11 00:33:09
 * @FilePath: \mall-server\app\router\shop\productRouter.js
 */
const Router = require('koa-router');
let productRouter = new Router({prefix: '/product'});

const productController = require('../../controller/productController');

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
productRouter.get('/classify', productController.classify);
productRouter.post('/addClassify', productController.addClassify);


module.exports = productRouter;
