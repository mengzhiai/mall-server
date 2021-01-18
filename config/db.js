/*
 * @Date: 2020-12-24 23:49:17
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-19 00:20:29
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
        resultData = JSON.stringify(results);
        results = JSON.parse(resultData);
        resolve(results);
      });

    });
  });
}
// 导出对象
module.exports = db;