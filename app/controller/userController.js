/*
 * @Date: 2021-01-05 00:16:32
 * @Description: 用户信息
 * @LastEditors: jun
 * @LastEditTime: 2021-01-05 00:40:36
 * @FilePath: \mall-server\app\controller\userController.js
 */
const userDao = require('../model/userDao');
const { use } = require('../router');

 module.exports = {
   login: async ctx => {
    let { userName, password } = ctx.request.body;
    if(!userName || !password) {
      ctx.body = {
        code: 422,
        message: '请输入用户名和密码'
      }
      return
    }
    
    
    let user = await userDao.login(userName, password);
    if(user.length === 0) {
      ctx.body = {
        code: 422,
        message: '用户名或密码错误'
      }
      return
    }
   }
 }
