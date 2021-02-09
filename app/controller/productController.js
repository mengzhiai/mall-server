/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-02-10 01:32:34
 * @FilePath: \mall-server\app\controller\productController.js
 */

const { errorMsg, successMsg } = require('../middleware/errorMessage');

const validoator = require('../middleware/validator');

const Product = require('../service/product');

module.exports = {
  // 获取商品列表
  async list(ctx) {
    let params = ctx.query;
    try {
      let result = await Product.list((parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit), params.keywords);
      ctx.body = result;
      return
      if (result) {
        ctx.body = successMsg('获取成功', result);
      }
    } catch (err) {
      ctx.body = errorMsg('获取失败', err);
    }
  },

  /**
   * @description: 添加商品
   * @param {Object}
   * @return {Object}
   */
  async add(ctx) {
    let params = ctx.request.body;
    let error = validoator.addProduct(params);
    console.log('error', error);
    if (Object.keys(error) != 0) {
      ctx.body = errorMsg(error.msg);
      return
    }

    // 添加商品
    try {
      let val = await Product.add(params);

      if (val) {
        ctx.body = successMsg('添加成功');
      }
    } catch (error) {
      ctx.body = errorMsg(400, error, '添加失败');
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

    let data = await Product.detail(id);
    if (!data) {
      ctx.body = errorMsg(400, '', '商品id不能为空');
      return
    }
    ctx.body = successMsg('获取成功', data);
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
      let val = await Product.detail(id);
      if (!val) {
        ctx.body = errorMsg('不存在此商品');
        return
      }

      // 删除商品
      let data = await Product.delete(id);
      ctx.body = data;
      if (data) {
        ctx.body = successMsg('删除成功');
      }
    } catch (err) {
      ctx.body = errorMsg('删除失败', err);
    }
  },
}