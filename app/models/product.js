/*
 * @Date: 2021-01-25 23:26:20
 * @Description: 商品列表
 * @LastEditors: jun
 * @LastEditTime: 2021-02-10 01:34:13
 * @FilePath: \mall-server\app\models\product.js
 */

const Sequelize = require('sequelize');
const sequelize = require('../../config/db');
const User = sequelize.define( "product",
  {
    productId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    productPrice: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    productDesc: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    img: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    seckillPrice: {
      type: Sequelize.DECIMAL,
    },
    isNew: {
      type: Sequelize.INTEGER,
    }
  },
  {
    // sequelize:db,
    sequelize,
    timestamps: false,//禁用时间戳
    tableName: "product",//明确定义表名
  }
);

module.exports = User;