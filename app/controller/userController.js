/*
 * @Date: 2021-01-05 00:16:32
 * @Description: 用户信息
 * @LastEditors: jun
 * @LastEditTime: 2021-01-20 00:17:13
 * @FilePath: \mall-server\app\controller\userController.js
 */
const {loginController} = require('../model/userDao');

const jwt = require('jsonwebtoken')
const secret = 'secret';

module.exports = {
  // 登录
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


    let user = await loginController(userName, password);
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
      // session保存token
      ctx.session.token = token;
      // 保存userId
      ctx.session.userId = user[0].id;
      
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
      data: ctx.session,
      userName: ctx.session.userName,
      msg: '获取成功'
    }
  },


  // 注册
  register: async ctx => {
    let query = ctx.request.body;
    console.log(query);
    let { userName, password } = ctx.request.body;
    if(userName && password) {
      await registerController(userName, password);
    } else {
      ctx.body = {
        code: 422,
        msg: '请输入用户名和密码'
      }
    }
  }
}

