/*
 * @Date: 2021-01-04 23:15:33
 * @Description: koaBody
 * @LastEditors: jun
 * @LastEditTime: 2021-01-04 23:24:05
 * @FilePath: \mall-server\app\middleware\koaBodyConfig.js
 */

const koaBodyConfig = {
  multipart: true,
  // parsedMethods默认是['POST', 'PUT', 'PATCH']
  parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
  formidable: {
    uploadDir: './public', // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小限制
    onFileBegin: (name, file) => { // 文件上传前的设置
      // console.log(`name: ${name}`);
      // console.log(file);
    }
  }
}

module.exports = koaBodyConfig;
