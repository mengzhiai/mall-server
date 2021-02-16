/*
 * @Date: 2021-01-27 22:30:43
 * @Description: 验证参数
 * @LastEditors: jun
 * @LastEditTime: 2021-02-15 15:26:43
 * @FilePath: \mall-server\app\middleware\validator.js
 */

const validator = require('validator');


module.exports = {
  // 是否为空
  isEmpty(val) {
    if (!val) {
      return true
    }
    if (validator.isEmpty(val)) {
      error(400);
      return true
    } else {
      return false
    }
  },



  // 添加商品
  addProduct(params) {
    console.log('params', params);
    let error = {};
    // 商品名称是否为空
    if(!params.productName || validator.isEmpty(params.productName)) {
      error.msg = '商品名称不能为空';
      return error;
    }

    // 商品分类
    if(!params.category || validator.isEmpty(params.category)) {
      error.msg = '商品分类不能为空';
      return error;
    } else if(params.category < 1 || params.category > 5){
      error.msg = '商品分类信息错误';
      return error;
    }

    // 商品价格
    if(!params.productPrice || validator.isEmpty(params.productPrice)) {
      error.msg = '商品价格不能为空';
      return error
    }
    // 检查金额格式是否正确
    if(!validator.isDecimal(params.productPrice)) {
      error.msg = '金额格式有误';
      return error;
    }

    return error;
  }
}
