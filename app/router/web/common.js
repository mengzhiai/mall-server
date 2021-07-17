/*
 * @Date: 2021-05-30 14:21:02
 * @Description: web端公用路由
 * @LastEditors: jun
 * @LastEditTime: 2021-07-17 16:45:27
 * @FilePath: \mall-server\app\router\web\common.js
 */
const Router = require('koa-router');
let commonRouter = new Router({ prefix: '/web/common' });

const { commonController } = require('../../controller/web/commonController');

// let user = require('../../../controller/admin/userController')


// 获取商品列表
commonRouter.get('/headerList', commonController.headerList);

// 获取bannder列表
commonRouter.get('/bannerList', commonController.bannerList);

// 获取分类列表
commonRouter.get('/classifyList', commonController.classifyLitst);

// 获取分类下的商品
commonRouter.get('/classifyProduct', commonController.classifyProduct);


// 获取商品详情
commonRouter.get('/productDetail', commonController.productDetail);

// 添加购物车
commonRouter.post('/addCart', commonController.addCart)

// 购物车列表
commonRouter.get('/cartList', commonController.cartList);


// 更新购物车数量
commonRouter.post('/updateCartNumer', commonController.updateCartNumer);

// 删除购物车
commonRouter.delete('/cartList/:id', commonController.deleteRow);

// 订单列表
commonRouter.get('/orderList', commonController.orderList);

// 地址管理
commonRouter.get('/addressList', commonController.addressList)

// 添加地址
commonRouter.post('/addAddress', commonController.addAddress);

// 地址详情
commonRouter.get('/addressDetail/:id', commonController.addressDetail);


// 更新地址
commonRouter.put('/updateAddress', commonController.updateAddress);

// 删除地址
commonRouter.delete('/deleteAddress/:id', commonController.deleteAddress);


// 用户注册
commonRouter.post('/register', commonController.register)

module.exports = commonRouter;