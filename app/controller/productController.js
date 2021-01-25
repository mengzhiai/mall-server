/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-01-25 23:59:21
 * @FilePath: \mall-server\app\controller\productController.js
 */

const productDao = require('../model/productDao');

module.exports = {
  // 获取商品列表
  productList: async ctx => {
    let productData = await productDao.productList();
    if(productData) {
      ctx.body = {
        data: productData,
        code: 200,
        msg: '获取成功'
      }
    }
  },

  // 添加商品
  addProduct: async ctx => {
    let params = ctx.request.body;
    // console.log(parasm);
    if(!params.categoryId) {
      ctx.body = {
        code: 422,
        msg: '商品分类不能为空'
      }
      return
    }
    if(!params.productName) {
      ctx.body = {
        code: 422,
        msg: '商品名称不能为空'
      }
      return
    }
    ctx.body = {
      params
    }
    let val = await productDao.addProduct();
  }
}