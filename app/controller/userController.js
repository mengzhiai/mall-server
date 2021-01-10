/*
 * @Date: 2021-01-05 00:16:32
 * @Description: 用户信息
 * @LastEditors: jun
 * @LastEditTime: 2021-01-11 00:17:01
 * @FilePath: \mall-server\app\controller\userController.js
 */
const userDao = require('../model/userDao');

const jwt = require('jsonwebtoken')

module.exports = {
  login: async ctx => {
    let { userName, password } = ctx.request.body;
    if (!userName || !password) {
      ctx.body = {
        code: 422,
        message: '请输入用户名和密码'
      }
      return
    }


    let user = await userDao.login(userName, password);
    if (user.length === 0) {
      ctx.body = {
        code: 422,
        message: '用户名或密码错误'
      }
      return
    } else {
      const token = jwt.sign({
        name: userName,
        _id: password
      }, 'token', { expiresIn: '2h' });
      return ctx.body = {
        code: '000001',
        data: token,
        msg: '登录成功'
      }
    }
  },

  // 获取用户列表
  list: async ctx => {
    let params = ctx.quyery;
    console.log(params);
    return ctx.body = {
      code: 200,
      data: params,
      message: '获取成功'
    }
  }
}
