/*
 * @Date: 2021-02-10 00:47:59
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-10 01:33:17
 * @FilePath: \mall-server\app\service\product.js
 */
const { add } = require("../controller/productController");
const Product = require("../models/product");
const { Op } = require("sequelize");

module.exports = {
  async list(page, limit, keywords) {
    return await Product.findAndCountAll({
      where: {
        productName: {
          [Op.like]: `${keywords}%` || ''
        }
      },
      offect: page,
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
        productId: id
      }
    })
  },

  // 删除
  async delete(id) {
    return await Product.destroy({
      where: {
        productId: id
      }
    })
  }
};