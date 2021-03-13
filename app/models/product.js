/*
 * @Date: 2021-01-25 23:26:20
 * @Description: 商品列表
 * @LastEditors: jun
 * @LastEditTime: 2021-03-13 14:41:33
 * @FilePath: \mall-server\app\models\product.js
 */

const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../config/db');

class Product extends Model {

};

class Classify extends Model {

};


// 商品列表
Product.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 1,
        msg: '分类信息有误'
      },
      max: {
        args: 5,
        msg: '分类信息有误'
      }
    }
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: '商品价格必须为数字'
      }
    }
  },
  productDesc: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  amount: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.INTEGER,
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
}, {
  sequelize,
  timestamps: false,//禁用时间戳
  tableName: "product",//明确定义表名
});


// 商品分类
Classify.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
},{
  sequelize,
  // timestamps: false,//禁用时间戳
  tableName: 'classify',//明确定义表名
})

module.exports = {
  Product,
  Classify
}