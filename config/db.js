/*
 * @Date: 2020-12-24 23:49:17
 * @Description: 数据库连接池
 * @LastEditors: jun
 * @LastEditTime: 2020-12-24 23:53:23
 * @FilePath: \mall-server\config\db.js
 */

const mysql = require('mysql');
const { dbConfig } = require('../config/db');
const pool = mysql.createPool(dbConfig);

db.query = function (sql, params) {

  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log(`${ sql }=>${ params }`);
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });

    });
  });
}
// 导出对象
module.exports = db;




