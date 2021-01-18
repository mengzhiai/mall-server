/*
 * @Date: 2021-01-14 23:39:53
 * @Description: token检查
 * @LastEditors: jun
 * @LastEditTime: 2021-01-19 00:26:48
 * @FilePath: \mall-server\app\middleware\tokenCheck.js
 */

// tokenCheck.js
const tokenCheck = function () {
  return async function (ctx, next) {
    // 判断是否是登录
    if((ctx.url).split('?')[0] == '/users/login') {
      await next();
      return
    }

    
    // 获取session中的token
    let sessionToken = ctx.session.token;
    // 获取headers中携带的token
    let headerToken = ctx.headers.authorization;
    let token = '';
    if(headerToken) {
      token = headerToken.split(' ')[1]
    }

    // 验证token
    if(!token) {
      ctx.body = {
        data: 401,
        msg: 'token不存在,请重新登录'
      }
    }

    // 判断携带的token是否正确
    if(token === sessionToken) {
      // 保存新的token
      ctx.session.token = token;
      await next();
    } else {
      ctx.body = {
        data: 401,
        msg: 'token有误,请检查'
      }
    }

    
    /* if (ctx.state.user) {
      // 如果携带有效 Token 就对 Token 进行检查（由 kow-jwt 检查 Token 有效性）
      let result = true
      // check here
      if (result) {
        await next()
      } else {
        ctx.body = {
          msg: "Token 检查未通过"
        }
      }
    } else {
      // 如果没有携带 Token 就跳过检查
      await next()
    } */
  }
}

module.exports = tokenCheck

