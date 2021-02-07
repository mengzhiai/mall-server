/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-02-07 23:53:26
 * @FilePath: \mall-server\app\controller\productController.js
 */

const { errorMsg, addSuccess, successMsg,  getSucccess } = require('../middleware/errorMessage');

const { addProduct } = require('../middleware/validator');

const productDao = require('../models/productDao');

module.exports = {
  // 获取商品列表
  async list(ctx) {
    let productData = await productDao.list();
    if (productData) {
      ctx.body = successMsg(productData, '获取成功');
    }
  },

  /**
   * @description: 添加商品
   * @param {Object}
   * @return {Object}
   */
  async add(ctx) {
    let params = ctx.request.body;
    let error = addProduct(params);
    console.log('error', error);
    if (Object.keys(error) != 0) {
      ctx.body = {
        code: 400,
        msg: error.msg
      };
      return
    } else {
      ctx.body = ctx;
    }

    // 添加商品
    try {
      let val = await productDao.addProduct(params);
      if (val.affectedRows === 1) {
        ctx.body = addSuccess();
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
    let { productId } = ctx.query;
    if (!productId) {
      ctx.body = (400, '', '商品id不能为空');
      return
    }

    let data = await productDao.detail(productId);
    if (!data.length) {
      ctx.body = errorMsg(400, '', '商品id不能为空');
      return
    }
    ctx.body = getSucccess(data);
  },


  /**
   * @description: 删除商品
   * @param {String} productId
   * @return {*}
   */
  async delete(ctx) {
    let { productId } = ctx.request.body;
    if (!productId) {
      ctx.body = errorMsg(400, '', '商品id不能为空');
      return
    }

    let val = await productDao.detail(productId);
    if (!val.length) {
      ctx.body = errorMsg(400, '', '不存在此商品');
      return
    }

    try {
      let data = await productDao.delete(productId);
      if (data.affectedRows === 1) {
        ctx.body = addSuccess('删除成功');
      }
    } catch (error) {
      ctx.body = errorMsg(400, error, '删除失败');
    }
  },


  // 查询
  async search(ctx) {
    let { productName } = ctx.query;

    try {
      let list = await productDao.search(productName);
      ctx.body = getSucccess(list, '查询成功');
    } catch (error) {
      ctx.body = errorMsg(400, error, '查询失败');
    }

  }
}