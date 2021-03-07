/*
 * @Date: 2021-01-05 00:16:32
 * @Description: 用户信息
 * @LastEditors: jun
 * @LastEditTime: 2021-03-07 10:39:55
 * @FilePath: \mall-server\app\controller\userController.js
 */
const { errorMsg, successMsg } = require('../middleware/errorMessage');


const jwt = require('jsonwebtoken')
const secret = 'secret';

const User = require('../service/user');
module.exports = {

  // 登录
  async login(ctx) {
    let { userName, password } = ctx.request.body;
    ctx.session.userName = 'Tom';
    if (!userName || !password) {
      ctx.body = {
        code: 422,
        message: '请输入用户名和密码'
      }
      return
    }



    try {
      let result = await User.login(userName, password);
      if (!result) {
        ctx.body = errorMsg('用户名或者密码错误');
        return
      }

      // session中保存token
      const token = jwt.sign({
        name: userName,
        _id: password
      }, 'token', { expiresIn: 1 });
      // session保存token
      ctx.session.token = token;
      // 保存userId
      ctx.session.userId = result.id;

      ctx.body = successMsg('登录成功', token);
    } catch (err) {
      ctx.body = errorMsg('登录失败', err)
    }
  },

  // 获取用户列表
  async getList(ctx) {
    let params = ctx.query;
    let result = await User.list((parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
    return ctx.body = successMsg('获取成功', result);
  },


  // 注册
  register: async ctx => {
    let { userName, password } = ctx.request.body;

    if (!userName || !password) {
      ctx.body = errorMsg('用户名或密码不能为空');
      return
    }

    try {
      // 查询用户是否存在
      const user = await User.search(userName);
      if(user) {
        ctx.body = errorMsg('当前用户已存在,请登录');
        return
      }

      // 注册
      let result = await User.register(userName, password);
      if(!result) {
        ctx.body = errorMsg('注册失败');
        return
      }
      ctx.body = successMsg('注册成功');
    } catch (err) {
      ctx.body = ('注册失败', err);
    }
  }
}

