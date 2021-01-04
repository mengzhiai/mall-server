/*
 * @Date: 2020-12-24 23:45:07
 * @Description: 数据库连接
 * @LastEditors: jun
 * @LastEditTime: 2021-01-04 21:58:46
 * @FilePath: \mall-server\config\mysql.js
 */

/*  const mysqlConfig = {
   user: 'root',
   password: '458677',
   database: 'mall_db',
   host: 'localhost',
   port: 3306

 }
 */

const path = require('path');

module.exports = {
  Port: 3000, // 启动端口
  staticDir: path.resolve('./public'), // 静态资源路径
  uploadDir: path.join(__dirname, path.resolve('public/')), // 上传文件路径
  // 数据库连接设置
  dbConfig: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '458677',
    database: 'mall_db'
  }
}