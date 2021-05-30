/*
 * @Date: 2021-02-20 23:21:07
 * @Description: 公用
 * @LastEditors: jun
 * @LastEditTime: 2021-03-23 23:55:16
 * @FilePath: \mall-server\app\controller\commonController.js
 */

const qiniu = require("qiniu");

const path = require('path')

let fs = require("fs");

const { errorMsg, successMsg } = require('../../middleware/errorMessage');

const validoatorTool = require('../../middleware/validator');

const Product = require('../../service/product');

const { ParameterException } = require('../../middleware/httpException');

//要上传的空间名
const bucket = 'azm'; 
const imageUrl = ''; // 域名名称
const accessKey = 'OZH9d7hJYRm9_q1B8FB8l4I25KMIOkEGHNfNeUVZ';
const secretKey = 'unc0e7Wo6JUAC34tfDoeKl1JQdDk7DmsOnI71eoW';
// let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: bucket,
};
/* var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2; */


module.exports = {
  async upload(ctx) {
    // 上传单个文件
    const file = ctx.request.files.file // 获取上传文件
    /* // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname) + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream); */

    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    return ctx.body = {
      msg: '上传成功',
      code: 200,
      url: file.path,
      data: uploadToken
    };
  }
}