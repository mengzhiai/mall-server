/*
 * @Date: 2021-02-20 23:21:07
 * @Description: 公用
 * @LastEditors: jun
 * @LastEditTime: 2021-07-18 02:17:50
 * @FilePath: \mall-server\app\controller\admin\commonController.js
 */
const  koa2Req = require('koa2-request');


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
  },


  async wxLogin(ctx) {
    let { code } = ctx.query;
    let appid = 'wx54b1d9f6b686a65b';
    let secret = '02224fd1c6e07df9f5873b97936e3c74';
    let res = await koa2Req(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`);
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: JSON.parse(res.body)
    }
  }
}