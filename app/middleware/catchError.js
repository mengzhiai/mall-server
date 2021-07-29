/*
 * @Date: 2021-02-17 15:23:10
 * @Description: 全局异常处理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-27 22:27:11
 * @FilePath: \mall-server\app\middleware\catchError.js
 */
const { HttpException } =  require('./httpException');
const catchError = async (ctx, next) => {
  /* try {
    await next();
  } catch (error) {
    if(error instanceof HttpException) {
      ctx.body = {
        code: error.code,
        msg: error.msg,
        request: `${ctx.method} ${ctx.path}`,
        errorCode: error.errorCode
      }
    } 
    else {
      let message = '服务器错误,请联系管理员';
      let errorCode = 500;
      if(error.errors && error.errors.length > 0) {
        message = error.errors[0].message;
        errorCode = 400;
      }
      ctx.body = {
        msg: message,
        data: error,
        code: errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
    }
  } */
  await next();
}

module.exports = catchError;
