/*
 * @Date: 2021-07-30 01:32:49
 * @Description: 订单
 * @LastEditors: jun
 * @LastEditTime: 2021-07-30 01:43:50
 * @FilePath: \mall-server\app\controller\admin\orderController.js
 */
const { errorMsg, successMsg } = require('../../middleware/errorMessage');
const validoatorTool = require('../../middleware/validator');

const { Order } = require("../../models/admin/order");

const orderController = {
  async list(ctx) {
    ctx.body = {aa:1}
    return
    await Order.findAll().then(res => {
      ctx.boby = successMsg('获取成功', res);
    })
  }
}

module.exports = {
  orderController
}