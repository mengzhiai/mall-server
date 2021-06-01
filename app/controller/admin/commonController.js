/*
 * @Date: 2021-02-20 23:21:07
 * @Description: 公用
 * @LastEditors: jun
 * @LastEditTime: 2021-06-01 22:44:09
 * @FilePath: \mall-server\app\controller\admin\commonController.js
 */

const qnconfig = require('../../middleware/qiniuConfig');

const { errorMsg, successMsg } = require('../../middleware/errorMessage');

module.exports = {
  async upload(ctx) {
    let data = qnconfig.uploadToken;
    ctx.body = successMsg('获取成功', data);
  }
}