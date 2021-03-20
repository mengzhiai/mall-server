/*
 * @Date: 2021-02-20 23:21:07
 * @Description: 公用
 * @LastEditors: jun
 * @LastEditTime: 2021-03-20 15:07:33
 * @FilePath: \mall-server\app\controller\commonController.js
 */

const path = require('path')

let fs = require("fs");

const { errorMsg, successMsg } = require('../middleware/errorMessage');

const validoatorTool = require('../middleware/validator');

const Product = require('../service/product');

const { ParameterException } = require('../middleware/httpException');


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
    return ctx.body = {
      msg: '上传成功',
      code: 200,
      url: file.path
    };
  }
}