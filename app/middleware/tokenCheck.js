/*
 * @Date: 2021-01-14 23:39:53
 * @Description: token检查
 * @LastEditors: jun
 * @LastEditTime: 2021-03-06 15:10:42
 * @FilePath: \mall-server\app\middleware\tokenCheck.js
 */

// tokenCheck.js
const tokenCheck = function () {
  return async function (ctx, next) {
    // 判断是否是登录
    if ((ctx.url).split('?')[0] == '/user/login' || (ctx.url).split('?')[0] == '/public/upload' || (ctx.url).split('?')[0] == '/user/register') {
      await next();
      return
    }


    // 获取session中的token
    let sessionToken = ctx.session.token;
    // 获取headers中携带的token
    // console.log('ctx.headers', ctx.headers);
    let headerToken = ctx.headers.token;
    let token = '';
    if (headerToken) {
      token = headerToken.split(' ')[1]
    }

    // 验证token
    if (!token) {
      ctx.body = {
        code: 401,
        msg: 'token不存在,请重新登录'
      }
      return
    }


    // 判断携带的token是否正确
    let tokenVal = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsIl9pZCI6IjExMTExMSIsImlhdCI6MTYyMjM4OTg1NSwiZXhwIjoxNjIyMzg5ODU2fQ.2Kd2EsrktM-LjsJpyLM3kTDp4PJV8CzpvtLl1tPEwv0'
    if (token !== tokenVal) {
      ctx.body = {
        code: 401,
        msg: 'token有误,请检查'
      }
      return
    } else {
      // 保存新的token
      ctx.session.token = token;
      await next();
    }
    /* if (token !== sessionToken) {
      ctx.body = {
        code: 401,
        msg: 'token有误,请检查'
      }
      return
    } else {
      // 保存新的token
      ctx.session.token = token;
      await next();
    } */
  }
}

module.exports = tokenCheck

