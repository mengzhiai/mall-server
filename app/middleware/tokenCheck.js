/*
 * @Date: 2021-01-14 23:39:53
 * @Description: token检查
 * @LastEditors: jun
 * @LastEditTime: 2021-06-01 22:35:05
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
    } else {
      await next();
    }


    // 判断携带的token是否正确
    /* let tokenVal = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsIl9pZCI6IjExMTExMSIsImlhdCI6MTYyMjU1Njc4NCwiZXhwIjoxNjIyNTU2Nzg1fQ.8R_AnhNEDSLRGeoaOD1ZbFgH0cmnV8aMB79cz5h3wzQ'
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
    } */

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

