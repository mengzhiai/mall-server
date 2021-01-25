/*
 * @Date: 2021-01-25 23:26:20
 * @Description: 商品列表
 * @LastEditors: jun
 * @LastEditTime: 2021-01-25 23:50:42
 * @FilePath: \mall-server\app\model\productDao.js
 */

const db = require("../../config/db");

 module.exports = {
   // 商品列表
   productList: async () => {
     const sql = `select * from product`;
     return db.query(sql, [])
   },

   // 添加商品
   addProduct: async () => {
     
   }
 }