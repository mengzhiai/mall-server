/*
 * @Date: 2021-01-25 23:04:51
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-18 13:56:11
 * @FilePath: \mall-server\app\router\admin\shop\productRouter.js
 */
const Router = require('koa-router');
let productRouter = new Router({ prefix: '/product' });
let classifyRouter = new Router({ prefix: '/classify' });

const { productController, classifyController } = require('../../../controller/admin/productController');

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
// 分类雷暴
classifyRouter.get('/list', classifyController.list);

// 添加分类
classifyRouter.post('/add', classifyController.add);

// 分类详情
classifyRouter.get('/detail/:id', classifyController.detail);

// 编辑分类
classifyRouter.put('/update', classifyController.update);

// 删除分类
classifyRouter.put('/delete/:id', classifyController.delete);



// 分类下的商品
classifyRouter.get('/goodsList', classifyController.goodsList);


module.exports = {
  productRouter,
  classifyRouter
}