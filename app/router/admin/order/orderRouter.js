/*
 * @Date: 2021-07-30 01:28:58
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-07-30 01:41:43
 * @FilePath: \mall-server\app\router\admin\order\orderRouter.js
 */


const Router = require('koa-router');
let orderRouter = new Router({ prefix: '/order' });

const { orderController } = require('../../../controller/admin/orderController');

orderRouter.get('/list', orderController.list);


module.exports = {
  orderRouter
}