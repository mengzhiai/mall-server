/*
 * @Date: 2021-02-10 00:47:59
 * @Description: 商品列表
 * @LastEditors: jun
 * @LastEditTime: 2021-03-11 00:57:12
 * @FilePath: \mall-server\app\service\product.js
 */
const { add } = require("../controller/productController");
const { Product, Classify } = require("../models/product");
const { Op } = require("sequelize");

// 产品列表
const Goods = {
  // 获取列表
  async list(keywords, page, limit) {
    return await Product.findAndCountAll({
      where: {
        productName: {
          [Op.like]: `${keywords}%` || ''
        }
      },
      offset: page,
      limit: limit
    })
  },


  // 添加
  async add(params) {
    return await Product.create(params);
  },

  // 详情
  async detail(id) {
    return await Product.findOne({
      where: {
        id: id
      }
    })
  },

  // 更新
  async update(params) {
    return await Product.update(params, {
      where: {
        id: params.id
      }
    })
  },

  // 删除
  async delete(id) {
    return await Product.destroy({
      where: {
        id: id
      }
    })
  }
}


const Category = {
  async list(keywords, page, limit) {
    return await Classify.findAndCountAll({
      where: {
        name: {
          [Op.like]: `${keywords}%` || ''
        }
      },
      offset: page,
      limit: limit
    })
  },


  // 添加分类
  // 添加
  async add(params) {
    return await Classify.create(params);
  },
}

module.exports = {
  Goods,
  Category
}