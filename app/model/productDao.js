/*
 * @Date: 2021-01-25 23:26:20
 * @Description: 商品列表
 * @LastEditors: jun
 * @LastEditTime: 2021-02-01 22:44:00
 * @FilePath: \mall-server\app\model\productDao.js
 */

const db = require("../../config/db");

module.exports = {
  // 商品列表
  async list() {
    const sql = `select * from product`;
    return await db.query(sql, [])
  },

  // 添加商品
  async add(params) {
    const sql = `insert into product (product_name, category_id, product_price, product_desc, seckill_price, is_new) 
    values('${params.productName}', ${params.categoryId}, ${params.productPrice}, '${params.productDesc}', ${params.seckillPrice}, ${params.isNew})`;
    return await db.query(sql, []);
  },

  // 获取商品详情
  async detail(productId) {
    const sql = `select * from product where product_id = ${productId}`;
    return await db.query(sql, []);
  },

  // 删除商品
  async delete(productId) {
    const sql = `delete from product where product_id = ${productId}`;
    return await db.query(sql, []);
  },

  // 查询商品
  async search(productName) {
    const sql = `SELECT * FROM product WHERE product_name like '${productName}%';`
    return await db.query(sql, []);
  }
}