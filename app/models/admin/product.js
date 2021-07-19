/*
 * @Date: 2021-01-25 23:26:20
 * @Description: 商品列表
 * @LastEditors: jun
 * @LastEditTime: 2021-07-20 00:28:54
 * @FilePath: \mall-server\app\models\admin\product.js
 */

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../../../config/db');

class Product extends Model {

};

class ProductDetail extends Model {
  
}

class Classify extends Model {

};

class ExhibitionImg extends Model {

}






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
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: '商品价格必须为数字'
      }
    }
  },
  description: {
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
    defaultValue: 2
  },
  detailContent: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  label: {
    type: Sequelize.STRING,
    defaultValue: ''
  }
}, {
  sequelize,
  // timestamps: false,//禁用时间戳
  tableName: "product",//明确定义表名
});


// 商品展示图
ExhibitionImg.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},{
  sequelize,
  tableName: "exhibition_img",//明确定义表名
})

Product.hasMany(ExhibitionImg, {foreignKey: 'productId', sourceKey: 'id', as: 'imgList'}),
ExhibitionImg.belongsTo(Product);



// 商品详情
ProductDetail.init({
  number: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  label: {
    type: Sequelize.STRING
  },
  exhibitionImg: {
    type: Sequelize.STRING
  },
  detailImg: {
    type: Sequelize.STRING
  }
},{
  sequelize,
  modelName: 'detail',
  tableName: "product_detail",//明确定义表名
})

Product.hasOne(ProductDetail);
ProductDetail.belongsTo(Product);


// 商品分类
Classify.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  img: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  sequelize,
  // timestamps: false,//禁用时间戳
  tableName: 'classify',//明确定义表名
})


Classify.hasMany(Product, {foreignKey: 'category', sourceKey: 'id', as: 'list'});
Product.belongsTo(Classify);


module.exports = {
  Product,
  Classify,
  ProductDetail,
  ExhibitionImg
}