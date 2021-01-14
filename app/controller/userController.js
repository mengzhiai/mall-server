/*
 * @Date: 2021-01-05 00:16:32
 * @Description: 用户信息
 * @LastEditors: jun
 * @LastEditTime: 2021-01-14 23:42:57
 * @FilePath: \mall-server\app\controller\userController.js
 */
const userDao = require('../model/userDao');

const jwt = require('jsonwebtoken')
const secret = 'secret';

module.exports = {
  login: async ctx => {
    let { userName, password } = ctx.request.body;
    ctx.session.userName = 'Tom';
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
  getList: async ctx => {
    let params = ctx.quyery;
    return ctx.body = {
      code: 200,
      data: params,
      userName: ctx.session.userName,
      message: '获取成功'
    }
  }
}
