/*
 * @Date: 2021-05-30 14:25:11
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-07-30 00:36:22
 * @FilePath: \mall-server\app\controller\web\commonController.js
 */
const { Op } = require("sequelize");

const sequelize = require('../../../config/db');

const { errorMsg, successMsg } = require('../../middleware/errorMessage');


const { HeaderList, Cart, Address, Order } = require("../../models/web/common");

const { Banner } = require("../../models/admin/carousel");


const { Classify, Product } = require("../../models/admin/product");

const User = require("../../models/admin/user");

const { HttpException } = require('../../middleware/httpException');

const validoatorTool = require('../../middleware/validator');


const commonController = {
  // 获取菜单列表
  async headerList(ctx) {
    await HeaderList.findAll().then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },

  // 获取banner
  async bannerList(ctx) {
    await Banner.findAll({
      where: {
        status: 1
      }
    }).then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },


  // 分类列表
  async classifyLitst(ctx) {
    let { type } = ctx.query;
    if (!type) {
      // 获取所有分类及分类下的商品
      await Classify.findAll({
        include: 'list'
      }).then(res => {
        ctx.body = successMsg('获取成功', res);
      })
    } else if (type == 2) {
      await Classify.findAll().then(res => {
        ctx.body = successMsg('获取成功', res);
      })
    }

  },

  // 商品详情
  async productDetail(ctx) {
    let { id } = ctx.query;
    if (!id) {
      ctx.body = errorMsg('商品id不存在');
      return
    }
    await Product.findOne({
      include: ['imgList'],
      where: {
        id: id
      }
    }).then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  },

  // 分类下的商品
  async classifyProduct(ctx) {
    let { category } = ctx.query;
    if (!category) {
      throw new HttpException('分类id不存在');
    }
    await Product.findAll({
      where: {
        category: category
      }
    }).then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  },

  // 添加到购物车
  async addCart(ctx) {
    const userId = ctx.session.userId;
    const { productId } = ctx.request.body;

    // 查询该商品基本信息
    const product = await Product.findOne({
      where: {
        id: productId
      }
    })

    if (!product) {
      throw new HttpException('商品id不存在');
    }



    // 查询购物车是否存在该商品
    let cartVal = await Cart.findOne({
      where: {
        productId: productId
      }
    });

    // 购物车是否存在该商品
    if (cartVal) {
      let prodNum = cartVal.num + 1;
      let prodPrice = product.price;
      const params = {
        userId: userId,
        productId: productId,
        num: cartVal.num + 1,
        price: product.price,
        totalPrice: prodPrice * prodNum,
      }
      // 存在商品更新
      await Cart.update(params, {
        where: {
          id: cartVal.id
        }
      }).then(res => {
        ctx.body = successMsg('添加购物车成功');
      })
    } else {
      // 不存在商品新建
      const params = {
        userId: userId,
        productId: productId,
        num: 1,
        productName: product.productName,
        img: product.img,
        price: product.price,
        checked: 1,
        totalPrice: product.price
      }

      await Cart.create(params).then(res => {
        ctx.body = successMsg('添加购物车成功');
      })
    }
  },

  // 购物车列表
  async cartList(ctx) {
    const userId = ctx.session.userId;
    // 已选中的商品
    const { type } = ctx.query;
    let obj = {
      userId
    }
    if (type) {
      obj.checked = type;
    }
    await Cart.findAll({
      where: obj,
      'order': [['create_time', 'desc']]
    }).then(res => {
      let total = 0;
      res.forEach(item => {
        if (item.checked === 1) {
          total += parseFloat(item.totalPrice);
        }
      })
      let data = {
        list: res,
        amountPrice: total
      }
      ctx.body = successMsg('获取成功', data);
    })
  },

  // 更新购物车数量
  async updateCartNumer(ctx) {
    const userId = ctx.session.userId;
    let { id, num } = ctx.request.body;

    let productObj = await Cart.findOne({
      where: {
        id,
        userId
      }
    });

    let totalPrice = parseInt(productObj.price) * num;
    await Cart.update({
      num,
      totalPrice: totalPrice
    }, {
      where: {
        id
      }
    }).then(res => {
      ctx.body = successMsg('更新成功');
    })
  },

  // 更改选中状态
  async updateChecked(ctx) {
    const params = ctx.request.body;

    validoatorTool.checkedData(params);
    await Cart.update({
      checked: params.checked
    }, {
      where: {
        id: params.id
      }
    }).then(res => {
      ctx.body = successMsg('更新成功');
    })
  },

  // 删除购物车
  async deleteRow(ctx) {
    const userId = ctx.session.userId;
    let { id } = ctx.params;
    await Cart.destroy({
      where: {
        id,
        userId
      }
    }).then(res => {
      ctx.body = successMsg('删除成功');
    })
  },


  // 地址列表
  async addressList(ctx) {
    const userId = ctx.session.userId;
    await Address.findAll({
      where: {
        userId
      },
      'order': [['update_time', 'desc']],
    }).then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  },

  // 添加地址
  async addAddress(ctx) {
    const userId = ctx.session.userId;
    const params = ctx.request.body;
    params.userId = userId;
    await Address.create(params).then(res => {
      ctx.body = successMsg('添加成功', res);
    })
  },

  // 地址详情
  async addressDetail(ctx) {
    const { id } = ctx.params;
    await Address.findOne({
      where: {
        id
      }
    }).then(res => {
      ctx.body = successMsg('获取成功', res);
    })
  },

  // 修改地址
  async updateAddress(ctx) {
    const params = ctx.request.body;
    await Address.update(params, {
      where: {
        id: params.id
      }
    }).then(res => {
      ctx.body = successMsg('修改成功');
    })
  },

  // 删除地址
  async deleteAddress(ctx) {
    const { id } = ctx.params;
    ctx.body = { id }
    await Address.destroy({
      where: {
        id: id
      }
    }).then(res => {
      if (res === 1) {
        ctx.body = successMsg('删除成功', res);
      } else {
        ctx.body = errorMsg('删除成功');
      }
    })
  },


  // 默认地址
  async defaultAddress(ctx) {
    const userId = ctx.session.userId;
    let { id } = ctx.params;
    let list = await sequelize.query(`update address set is_default = null where user_id=${userId}`);

    if (list) {
      await Address.update({
        isDefault: 1
      }, {
        where: {
          id
        }
      }).then(res => {
        ctx.body = successMsg('修改地址成功');
      })
    }

  },


  /* --用户注册-- */
  async register(ctx) {
    let params = ctx.request.body;
    validoatorTool.userRegister(params);
    let val = User.findOne({
      where: {
        phone: params.phone
      }
    })
    ctx.body = {
      val
    }
  },


  /* --订单-- */
  async submitOrder(ctx) {
    const userId = ctx.session.userId;
    let list = ctx.request.body;
    let dataList = [];
    list.forEach(item => {
      let obj = {
        orderSn: 'order' + new Date().getTime(),
        productId: item.productId,
        productNum: item.num,
        productPrice: parseInt(item.price),
        userId: userId,
        addressId: item.addressId
      }
      dataList.push(obj);
    })

    const resultVal = await sequelize.transaction(async (t) => {
      const order = await Order.bulkCreate(dataList, { transaction: t });

      await Cart.destroy({
        where: {
          userId,
          checked: 1
        }
      }, { transaction: t })
      return order;
    })
    ctx.body = successMsg('创建订单成功', resultVal);
  },

  dataVal() {
    ctx.body = { data: 1111 }
  },

  // 订单列表
  /* async orderList(ctx) {
    const userId = ctx.session.userId;
    let orderData = await Order.findAll({
      where: {
        userId: userId
      },
      'order': [['create_time', 'desc']],
    }).then(res => {
      let dataList = [...res];
      dataList.forEach(item => {
        item.test = { aa: 1 }
        item.val = []
      })
      ctx.body = { dataList }
    })

    // let addressData = await Address.findAll({
    //   where: {
    //     userId,
    //     isDefault: 1
    //   },
    //   attributes: ['id', 'name', 'tel', 'postCode', 'detail_address']
    // });

  }, */

  async orderList(ctx) {
    const userId = ctx.session.userId;
    let list= await Order.findAll({
      where: {
        userId
      },
      'order': [['create_time', 'desc']],
    })

    ctx.body = {list}
  }
}

module.exports = {
  commonController
}