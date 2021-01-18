/*
 * @Date: 2021-01-14 23:39:53
 * @Description: token检查
 * @LastEditors: jun
 * @LastEditTime: 2021-01-19 00:09:18
 * @FilePath: \mall-server\app\middleware\tokenCheck.js
 */

// tokenCheck.js
const tokenCheck = function () {
  return async function (ctx, next) {
    // 判断是否是登录
    console.log('ctx.url', ctx.url);
    if((ctx.url).split('?')[0] == '/users/login') {
      await next();
      return
    }

    // 验证token
    let sessionToken = ctx.session.token;
    let headerToken = ctx.headers.authorization;
    let token = '';
    if(headerToken) {
      token = headerToken.split(' ')[1]
    }

    if(!token) {
      ctx.body = {
        data: 401,
        msg: 'token不存在,请重新登录'
      }
    }
    if(token === sessionToken) {
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

