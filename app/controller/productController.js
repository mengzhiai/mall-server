/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-02-18 01:05:17
 * @FilePath: \mall-server\app\controller\productController.js
 */

const { errorMsg, successMsg } = require('../middleware/errorMessage');

const validoatorTool = require('../middleware/validator');

const Product = require('../service/product');

const { ParameterException } = require('../middleware/httpException');

module.exports = {
  // 获取商品列表
  async list(ctx) {
    let params = ctx.query;
    if (!params.page || !params.limit) {
      const error = new ParameterException();
      throw error;
    }
    let result = await Product.list(params.keywords, (parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
    if (result) {
      ctx.body = successMsg('获取成功', result);
    }
    /* try {
      let result = await Product.list(params.keywords, (parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
      if (result) {
        ctx.body = successMsg('获取成功', result);
      }
    } catch (err) {
      ctx.body = errorMsg('获取失败', err.errors[0].message);
    } */
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
    let val = await Product.add(params);
    if (val) {
      ctx.body = successMsg('添加成功');
    }

    // 添加商品
    /* try {
      let val = await Product.add(params);

      if (val) {
        ctx.body = successMsg('添加成功');
      }
    } catch (error) {
      ctx.body = errorMsg('添加失败', error.errors[0].message);
    } */
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
   * @description: 更新
   * @param {*}
   * @return {*}
   */
  async update(ctx) {
    let params = ctx.request.body;
    try {
      let result = await Product.update(params);
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