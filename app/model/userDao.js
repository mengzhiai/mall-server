/*
 * @Date: 2021-01-05 00:23:22
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-05 00:27:59
 * @FilePath: \mall-server\app\model\userDao.js
 */
const db = require('../../config/db');
 module.exports = {
   login: async (userName, password) => {
     const sql = 'select * from users where userName = ? and password = ?';
     return db.query(sql, [userName, password])
   }
 }