/*
 * @Date: 2021-07-04 01:51:25
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-04 02:26:41
 * @FilePath: \mall-server\app\models\admin\carousel.js
 */

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

class Banner extends Model {

};

Banner.init({
  title: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      min: 1,
      max: 2
    }
  },
  // startTime:{
  //   type: DataTypes.DATE
  // },
  jumpocation: {
    type: Sequelize.STRING
  }
},{
  sequelize,
  // timestamps: false,//禁用时间戳
  tableName: "banner",//明确定义表名
})


module.exports = {
  Banner
}