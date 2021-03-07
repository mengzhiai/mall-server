/*
 * @Date: 2021-01-05 00:23:22
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-03-06 15:15:19
 * @FilePath: \mall-server\app\models\user.js
 */
const bcrypt = require('bcryptjs');

const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../config/db');

const { ParameterException } = require('../middleware/httpException');

/* const User = sequelize.define( "user",
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
    },
    test: {
      type: Sequelize.STRING
    }
  },
  {
    // sequelize:db,
    sequelize,
    timestamps: false,//禁用时间戳
    tableName: "user",//明确定义表名
  }
);

sequelize.sync({
  force: false
})

module.exports = User; */

class User extends Model {
  /* static async verifyEmailUser(userName) {
    const user = await User.findOne({
      userName
    })
    if(user) {
      new ParameterException('当前用户已存在');
      throw error;
    }
  } */
}

User.init({
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
    set(val) {
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    }
  }
},{
  sequelize,
  tableName: 'user'
})


module.exports = User;