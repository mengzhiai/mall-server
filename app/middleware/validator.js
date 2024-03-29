/*
 * @Date: 2021-01-27 22:30:43
 * @Description: 验证参数
 * @LastEditors: jun
 * @LastEditTime: 2021-07-27 22:30:57
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
    if(!params.price) {
      let error = new ParameterException('商品价格不能为空');
      throw error;
    }

    if(!params.imgList || !params.imgList.length) {
      throw new ParameterException('请上传展示图');
    }
  },

  // 轮播图管理
  // 添加/编辑轮播图
  banner(params) {
    // 标题
    if(!params.title) {
      throw new ParameterException('标题不能为空');
    }

    if(!params.img) {
      throw new ParameterException('图片不能为空')
    }

    if(!params.jumpId) {
      throw new ParameterException('跳转id不能为空');
    }
  },

  // 用户注册
  userRegister(params){
    if(!params.phone) {
      throw new ParameterException('手机号不存在');
    }
    if(isNaN(params.phone) || params.length != 11) {
      throw new ParameterException('请输入正确的手机号');
    }
  },

  // 购物车选中/取消
  checkedData(params) {
    if(!params.id) {
      throw new ParameterException('购物车id不能为空');
    }

    if(!params.checked) {
      throw new ParameterException('选中状态必传');
    } 
    
    // if(params.checked != 1 || params.checked != 2) {
    //   throw new ParameterException('选中状态参数有误');
    // }
  }
}
