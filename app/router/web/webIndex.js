const Router = require('koa-router');
const webRouter = new Router();

const commonRouter = require('./common');


webRouter.use(commonRouter.routes());


module.exports = commonRouter