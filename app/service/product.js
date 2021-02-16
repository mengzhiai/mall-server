/*
 * @Date: 2021-02-10 00:47:59
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-15 14:46:28
 * @FilePath: \mall-server\app\service\product.js
 */
const { add } = require("../controller/productController");
const Product = require("../models/product");
const { Op } = require("sequelize");

module.exports = {
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
        id:params.id
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
};