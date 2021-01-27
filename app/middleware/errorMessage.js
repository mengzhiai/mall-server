/*
 * @Date: 2021-01-27 23:41:39
 * @Description: 公用返回值
 * @LastEditors: jun
 * @LastEditTime: 2021-01-28 00:17:58
 * @FilePath: \mall-server\app\middleware\errorMessage.js
 */

// 返回失败
const errorMsg = (code, msg, data) => {
  let obj = {
    code: code,
    msg: msg
  }
  if (data) {
    obj.data = data;
  }
  return obj;
}

// 返回成功
const successMsg = (data, msg = '获取成功') => {
  let obj = {
    code: 200,
    msg: msg,
    data: data
  }
  return obj;
}

module.exports = {
  errorMsg,
  successMsg
};