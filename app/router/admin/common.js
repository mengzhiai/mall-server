/*
 * @Date: 2021-02-20 23:19:45
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-07-18 02:00:16
 * @FilePath: \mall-server\app\router\admin\common.js
 */
const Router = require('koa-router');
let commonRouter = new Router({prefix: '/public'});

const commonController = require('../../controller/admin/commonController');


// 更新商品
commonRouter.get('/tokenData', commonController.upload);

// 获取所有商品列表
commonRouter.get('/allProductList', commonController.allProductList);

// 小程序登录
commonRouter.get('/wxLogin', commonController.wxLogin)


module.exports = commonRouter;