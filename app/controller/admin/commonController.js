/*
 * @Date: 2021-02-20 23:21:07
 * @Description: 公用
 * @LastEditors: jun
 * @LastEditTime: 2021-07-10 15:12:35
 * @FilePath: \mall-server\app\controller\admin\commonController.js
 */
const { Product } = require("../../models/admin/product");
const { Op } = require("sequelize");

const qnconfig = require('../../middleware/qiniuConfig');

const { errorMsg, successMsg } = require('../../middleware/errorMessage');

module.exports = {
  async upload(ctx) {
    let data = qnconfig.uploadToken;
    ctx.body = successMsg('获取成功', data);
  },


  async allProductList(ctx) {
    await Product.findAll().then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  }
}