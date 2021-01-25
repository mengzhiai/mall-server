/*
 * @Date: 2021-01-05 00:23:22
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-25 23:16:32
 * @FilePath: \mall-server\app\model\userDao.js
 */
const db = require('../../config/db');
module.exports = {
  // 用户登录
  login: async (userName, password) => {
    const sql = 'select * from users where userName = ? and password = ?';
    return db.query(sql, [userName, password]);
  },

  // 用户查询
  findUserName: async (userName) => {
    const sql = 'select * from users where userName = ?';
    return db.query(sql, [userName]);
  },

  registerController: async (userName, password) => {
    const sql = 'insert into users values(null,?,?)'
    return db.query(sql, [userName, password]);
  },
}