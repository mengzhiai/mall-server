/*
 * @Date: 2021-01-27 23:41:39
 * @Description: 公用返回值
 * @LastEditors: jun
 * @LastEditTime: 2021-02-10 01:16:48
 * @FilePath: \mall-server\app\middleware\errorMessage.js
 */


module.exports = {
  // 添加成功
  addSuccess(msg = '添加成功') {
    let obj = {
      code: 200,
      msg: msg
    }
    return obj;
  },

  // 获取成功
  getSucccess(data, msg = '获取成功') {
    let obj = {
      code: 200,
      msg: msg,
      data: data
    }
    return obj;
  },

  errorMsg(msg, data) {
    let obj = {
      code: 422,
      msg: msg
    }
    if (data) {
      obj.data = data;
    }
    return obj;
  },

  successMsg( msg, data = '') {
    let obj = {
      code: 200,
      msg: msg
    }
    if(data) {
      obj.data = data;
    }
    return obj;
  }
}