/*
 * @Date: 2021-02-09 23:28:56
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-10 00:39:56
 * @FilePath: \mall-server\app\service\user.js
 */
const User = require("../models/User");

module.exports = {
  // 登陆
  async login(userName, password) {
    return await User.findOne({
      where: {
        userName,
        password
      }
    })
  },

  // 查询
  async search(userName) {
    return await User.findOne({
      where: {
        userName
      }
    })
  },

  // 注册用户
  async register(userName, password) {
    return await User.create({
      userName: userName,
      password:password
    })
  },


  // 获取用户列表
  async list(page, limit) {
    return await User.findAndCountAll({
      offect: page,
      limit: limit
    })
  }

}