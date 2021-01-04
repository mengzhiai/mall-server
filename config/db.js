/*
 * @Date: 2020-12-24 23:49:17
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-05 00:08:01
 * @FilePath: \mall-server\config\db.js
 */
var mysql = require('mysql');
const { dbConfig } = require('./mysql');
var pool = mysql.createPool(dbConfig);

var db = {};

db.query = function (sql, params) {

  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log('aaaa',`${ sql }=>${ params }`);
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