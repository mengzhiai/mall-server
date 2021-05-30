const { errorMsg, successMsg } = require('../../middleware/errorMessage');


const { HeaderList, BannerList } = require("../../models/web/common");


const { Classify } = require("../../models/product");



const commonController = {

  // 获取菜单列表
  async headerList(ctx) {
    await HeaderList.findAll().then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },

  // 获取banner
  async bannerList(ctx) {
    await BannerList.findAll().then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },


  // 分类列表
  async classifyLitst(ctx) {
    await Classify.findAll({
      include: 'list'
    }).then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  }
}

module.exports = {
  commonController
}