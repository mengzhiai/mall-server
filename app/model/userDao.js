/*
 * @Date: 2021-01-05 00:23:22
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-01-20 00:47:51
 * @FilePath: \mall-server\app\model\userDao.js
 */
const db = require('../../config/db');
 module.exports = {
  loginController: async (userName, password) => {
     const sql = 'select * from users where userName = ? and password = ?';
     return db.query(sql, [userName, password])
   },

   registerController: async(userName, password) => {
    //  return db.query(sql, )
   },
 }