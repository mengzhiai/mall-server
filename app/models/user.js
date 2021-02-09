/*
 * @Date: 2021-01-05 00:23:22
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-10 00:43:10
 * @FilePath: \mall-server\app\models\user.js
 */

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