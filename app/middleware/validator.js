/*
 * @Date: 2021-01-27 22:30:43
 * @Description: 验证参数
 * @LastEditors: jun
 * @LastEditTime: 2021-01-28 00:02:06
 * @FilePath: \mall-server\app\middleware\validator.js
 */

const validator = require('validator');


module.exports = {
  // 是否为空
  isEmpty(val) {
    if (!val) {
      return true
    }
    if (validator.isEmpty(val)) {
      error(400);
      return true
    } else {
      return false
    }
  },
}
