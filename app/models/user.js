/*
 * @Date: 2021-01-05 00:23:22
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-08 00:31:21
 * @FilePath: \mall-server\app\models\user.js
 */
/* const db = require('../../config/db');
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
} */

const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
const User = sequelize.define( "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    // sequelize:db,
    sequelize,
    timestamps: false,//禁用时间戳
    tableName: "user",//明确定义表名
  }
);

module.exports = User;