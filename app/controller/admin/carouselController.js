/*
 * @Date: 2021-07-04 01:17:40
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-04 02:31:35
 * @FilePath: \mall-server\app\controller\admin\carouselController.js
 */
const { errorMsg, successMsg } = require('../../middleware/errorMessage');
const validoatorTool = require('../../middleware/validator');
const { Banner } = require("../../models/admin/carousel");
const { Op } = require("sequelize");


const bannerController = {
  /* async list(ctx) {
    ctx.body = {
      data:111
    }
  } */
  async list(ctx) {
    let params = ctx.query;
    await Banner.findAndCountAll({
      where: {
        title: {
          [Op.like]: `${keywords}%` || ''
        }
      },
      offset: params.page,
      limit: params.limit
    }).then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },
}

module.exports = {
  bannerController
}