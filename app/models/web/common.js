const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../../config/db');

class HeaderList extends Model { };

class BannerList extends Model { };



// 商品分类
HeaderList.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  timestamps: false,
  // timestamps: false,//禁用时间戳
  tableName: 'web_header',//明确定义表名
})


// banner列表
BannerList.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bannerName: {
    type: Sequelize.STRING
  },
  bannerUrl: {
    type: Sequelize.STRING
  }
},{
  sequelize,
  timestamps: true,
  tableName: 'web_banner_list',
})


module.exports = {
  HeaderList,
  BannerList
}