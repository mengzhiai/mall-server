/*
 * @Date: 2021-02-20 23:19:45
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-20 23:31:31
 * @FilePath: \mall-server\app\router\common.js
 */
const Router = require('koa-router');
let commonRouter = new Router({prefix: '/public'});

const commonController = require('../../controller/admin/commonController');


// 更新商品
commonRouter.post('/upload', commonController.upload);


module.exports = commonRouter;