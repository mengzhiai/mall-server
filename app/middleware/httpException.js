/*
 * @Date: 2021-02-17 15:49:30
 * @Description: 统一异常
 * @LastEditors: jun
 * @LastEditTime: 2021-02-18 00:29:11
 * @FilePath: \mall-server\app\middleware\httpException.js
 */

class HttpException extends Error {
  constructor(msg='服务器错误', code = 400) {
    super();
    this.code = code;
    this.msg = msg;
  }
}


class ParameterException extends HttpException {
  constructor(msg, code) {
    super();
    this.msg = msg || '参数错误';
    this.code = code || 400;
  }
}

module.exports = {
  HttpException,
  ParameterException
};