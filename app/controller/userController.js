/*
 * @Date: 2021-01-05 00:16:32
 * @Description: 用户信息
 * @LastEditors: jun
 * @LastEditTime: 2021-02-08 00:44:01
 * @FilePath: \mall-server\app\controller\userController.js
 */
// const userDao = require('../models/user');

const jwt = require('jsonwebtoken')
const secret = 'secret';

const User = require('../models/user')
module.exports = {

  // 登录
  async login(ctx) {
    let params = ctx.request.body;
    let { userName, password } = ctx.request.body;
    ctx.session.userName = 'Tom';
    if (!userName || !password) {
      ctx.body = {
        code: 422,
        message: '请输入用户名和密码'
      }
      return
    }

    // 查找用户名和密码是否存在
    let result = await User.findAll({
      where: {
        userName: userName,
        password: password
      }
    });

    if (!result.length) {
      ctx.body = {
        code: 422,
        msg: '用户名或密码错误'
      }
    } else {
      const token = jwt.sign({
        name: userName,
        _id: password
      }, 'token', { expiresIn: '2h' });
      // session保存token
      ctx.session.token = token;
      // 保存userId
      ctx.session.userId = result[0].id;

      ctx.body = {
        code: 200,
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
    console.log('ctx', ctx.request.body);
    let { userName, password } = ctx.request.body;
    const user = await userDao.findUserName(userName);

    if (userName && password) {
      let val = await user.registerController(userName, password);
      if (val.affectedRows == 1) {
        ctx.body = {
          data: 200,
          msg: '注册成功'
        }
      }
    } else {
      ctx.body = {
        code: 422,
        msg: '请输入用户名和密码'
      }
    }
  }
}

