/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-06-14 18:49:40
 * @FilePath: \mall-server\app\controller\admin\productController.js
 */

const { errorMsg, successMsg } = require('../../middleware/errorMessage');

const validoatorTool = require('../../middleware/validator');

// 产品管理
const { Goods, Category } = require('../../service/product');

const { ParameterException } = require('../../middleware/httpException');

// 商品列表
const productController = {
  // 获取商品列表
  async list(ctx) {
    let params = ctx.query;
    if (!params.page || !params.limit) {
      const error = new ParameterException();
      throw error;
    }
    if(!params.keywords) {
      params.keywords = '';
    }
    let result = await Goods.list(params.keywords, (parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
    if (result) {
      ctx.body = successMsg('获取成功', result);
    }
  },

  /**
   * @description: 添加商品
   * @param {Object}
   * @return {Object}
   */
  async add(ctx) {
    let params = ctx.request.body;
    // 验证字段
    validoatorTool.addProduct(params);
    let val = await Goods.add(params);
    if (val) {
      ctx.body = successMsg('添加成功');
    }
  },


  /**
   * @description: 商品详情
   * @param {String} productId
   * @return {Object}
   */

  async detail(ctx) {
    let { id } = ctx.query;
    if (!id) {
      ctx.body = (400, '', '商品id不能为空');
      return
    }

    let data = await Goods.detail(id);
    if (!data) {
      ctx.body = errorMsg(400, '', '商品id不能为空');
      return
    }
    ctx.body = successMsg('获取成功', data);
  },



  /**
   * @description: 更新
   * @param {*}
   * @return {*}
   */
  async update(ctx) {
    let params = ctx.request.body;
    try {
      let result = await Goods.update(params);
      if (result.length) {
        ctx.body = successMsg('更新成功');
      }
    } catch (err) {
      ctx.body = errorMsg('更新失败', err);
    }

  },


  /**
   * @description: 删除商品
   * @param {String} productId
   * @return {*}
   */
  async delete(ctx) {
    let { id } = ctx.request.body;
    if (!id) {
      ctx.body = errorMsg('商品id不能为空');
      return
    }

    try {
      // 查询商品是否存在
      let val = await Goods.detail(id);
      if (!val) {
        ctx.body = errorMsg('不存在此商品');
        return
      }

      // 删除商品
      let data = await Goods.delete(id);
      ctx.body = data;
      if (data) {
        ctx.body = successMsg('删除成功');
      }
    } catch (err) {
      ctx.body = errorMsg('删除失败', err);
    }
  },
}

/* ------------商品分类--------------- */
const classifyController = {
  // 分类列表
  async list(ctx) {
    let params = ctx.query;
    let result = await Category.list(params.keywords, (parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
    // let result = await Category.list();
    if (result) {
      ctx.body = successMsg('获取成功', result);
    }
  },

  // 添加分类
  async add(ctx) {
    let params = ctx.request.body;
    let result = await Category.add(params);
    if (result) {
      ctx.body = successMsg('添加成功');
    }
  },

  // 分类下的商品列表
  async goodsList(ctx) {
    let params = ctx.query;
    let result = await Category.goodsList(params.id);
    if(result) {
      ctx.body = successMsg('获取成功', result);
    }
  }
}


module.exports = {
  productController,
  classifyController
}