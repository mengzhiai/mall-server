/*
 * @Date: 2021-01-27 22:30:43
 * @Description: 验证参数
 * @LastEditors: jun
 * @LastEditTime: 2021-02-18 01:12:08
 * @FilePath: \mall-server\app\middleware\validator.js
 */

const validator = require('validator');
const { ParameterException } = require('../middleware/httpException');


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
    // 商品名称是否为空
    if(!params.productName) {
      const error = new ParameterException('产品名称不能为空');
      throw error;
    }

    // 商品分类
    if(!params.category) {
      let error = new ParameterException('商品分类不能为空');
      throw error;
    }

    // 商品价格
    if(!params.productPrice) {
      let error = new ParameterException('商品价格不能为空');
      throw error;
    }
  }
}
