/*
 * @Date: 2021-06-01 22:28:56
 * @Description: 七牛云上传
 * @LastEditors: jun
 * @LastEditTime: 2021-06-01 22:29:43
 * @FilePath: \mall-server\app\middleware\qiniuConfig.js
 */

const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'OZH9d7hJYRm9_q1B8FB8l4I25KMIOkEGHNfNeUVZ'
const secretKey = 'unc0e7Wo6JUAC34tfDoeKl1JQdDk7DmsOnI71eoW'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'azm',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}