/*
 * @Date: 2021-07-30 01:35:00
 * @Description: 订单模型
 * @LastEditors: jun
 * @LastEditTime: 2021-07-30 01:35:32
 * @FilePath: \mall-server\app\models\admin\order.js
 */

const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../../config/db');


class Order extends Model { };

Order.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  orderSn: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productNum: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  addressId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},{
  sequelize,
  timestamps: true,
  tableName: 'order',//明确定义表名
})


module.exports = {
  Order
}