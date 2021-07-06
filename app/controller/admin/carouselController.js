/*
 * @Date: 2021-07-04 01:17:40
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-07 01:24:13
 * @FilePath: \mall-server\app\controller\admin\carouselController.js
 */
const { errorMsg, successMsg } = require('../../middleware/errorMessage');
const validoatorTool = require('../../middleware/validator');

const { Banner } = require("../../models/admin/carousel");
const { Op } = require("sequelize");



const bannerController = {
  // 获取列表
  async list(ctx) {
    await Banner.findAll().then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },

  // 添加轮播图
  async add(ctx) {
    validoatorTool.banner(ctx.request.body);
    Banner.create(params).then(res => {
      ctx.body = successMsg('添加成功', res);
    })
  }
}

module.exports = {
  bannerController
}