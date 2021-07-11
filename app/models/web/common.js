/*
 * @Date: 2021-05-30 20:38:52
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-07-12 01:14:07
 * @FilePath: \mall-server\app\models\web\common.js
 */
const { Sequelize, Model } = require('sequelize');
const sequelize = require('../../../config/db');


class HeaderList extends Model { };



class Cart extends Model { };

class Address extends Model {};



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


// 购物车列表
Cart.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  checked: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  num: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type:Sequelize.DECIMAL,
    allowNull: false
  },
  totalPrice: {
    type:Sequelize.DECIMAL,
    allowNull: false
  },
  cartInfo: {
    type: Sequelize.STRING
  },
}, {
  sequelize,
  timestamps: true,
  // timestamps: false,//禁用时间戳
  tableName: 'cart',//明确定义表名
})

// User.hasMany(Cart);
// Cart.belongsTo(User);

Address.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tel: {
    type: Sequelize.STRING,
    allowNull: false
  },
  province: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  area: {
    type: Sequelize.STRING
  },
  postCode: {
    type: Sequelize.STRING
  },
  detailAddress: {
    type: Sequelize.STRING,
  },
  isDefault: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
},{
  sequelize,
  timestamps: true,
  tableName: 'address',//明确定义表名
})



module.exports = {
  HeaderList,
  Cart,
  Address
}