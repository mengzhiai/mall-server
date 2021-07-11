/*
 * @Date: 2021-07-04 01:17:40
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-10 15:48:03
 * @FilePath: \mall-server\app\controller\admin\carouselController.js
 */
const { errorMsg, successMsg } = require('../../middleware/errorMessage');
const validoatorTool = require('../../middleware/validator');

const { Banner } = require("../../models/admin/carousel");
const { Op, where } = require("sequelize");



const bannerController = {
  // 获取列表
  async list(ctx) {
    let { keyword } = ctx.query;
    await Banner.findAll({
      // where: {
      //   keyword: {
      //     [Op.like]: `${keyword}%` || ''
      //   }
      // },
      'order': [['create_time', 'desc']],
    }).then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },

  // 添加轮播图
  async add(ctx) {
    let params = ctx.request.body;
    validoatorTool.banner(ctx.request.body);
    await Banner.create(params).then(res => {
      if (res.id) {
        ctx.body = successMsg('添加成功');
      }
    })
  },

  // 详情
  async detail(ctx) {
    const params = ctx.params;
    await Banner.findOne({
      where: {
        id: params.id
      }
    }).then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  },

  // 更新
  async update(ctx) {
    const params = ctx.request.body;
    validoatorTool.banner(params);
    await Banner.update(params, {
      where: {
        id: params.id
      }
    }).then(res => {
      ctx.body = successMsg('更新成功', res);
    })
  },

  // 删除
  async delete(ctx) {
    const { id } = ctx.params;
    await Banner.destroy({
      where: {
        id
      }
    }).then(res => {
      if (res === 1) {
        ctx.body = successMsg('删除成功', res);
      } else {
        ctx.body = errorMsg('删除失败');
      }
    })
  },

  // 修改状态
  async editStatus(ctx) {
    let { id, status } = ctx.request.body;
    await Banner.update({
      status: status
    }, {
      where: {
        id
      }
    }).then(res => {
      ctx.body = successMsg('修改成功');
    })
  }
}

module.exports = {
  bannerController
}