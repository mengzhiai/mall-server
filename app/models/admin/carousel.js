/*
 * @Date: 2021-07-04 01:51:25
 * @Description: 轮播图管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-08 23:26:43
 * @FilePath: \mall-server\app\models\admin\carousel.js
 */

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

class Banner extends Model {

};

Banner.init({
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  startTime:{
    type: DataTypes.DATE
  },
  endTime:{
    type: DataTypes.DATE
  },
  jumpId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  sequelize,
  // timestamps: false,//禁用时间戳
  tableName: "banner",//明确定义表名
})


module.exports = {
  Banner
}