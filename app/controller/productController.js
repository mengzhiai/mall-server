/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-01-28 00:20:01
 * @FilePath: \mall-server\app\controller\productController.js
 */

const {errorMsg, successMsg} = require('../middleware/errorMessage');

const {isEmpty} = require('../middleware/validator');

const productDao = require('../model/productDao');

module.exports = {
  // 获取商品列表
  productList: async ctx => {
    let productData = await productDao.productList();
    if(productData) {
      ctx.body = successMsg(productData);
    }
  },

  // 添加商品
  addProduct: async ctx => {
    let params = ctx.request.body;
    // 商品名称
    if(isEmpty(params.productName)) {
      ctx.body = errorMsg(422, '商品名称不能为空');
      return
    }
    
    // 商品分类
    if(isEmpty(params.categoryId)) {
      ctx.body = errorMsg(422, '商品分类不能为空');
      return
    }

    // 商品价格
    if(isEmpty(params.productPrice)) {
      ctx.body = errorMsg(422, '商品价格不能为空');
      return
    }

    ctx.body = successMsg('11')
    let val = await productDao.addProduct();
  }
}