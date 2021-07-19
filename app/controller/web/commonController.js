/*
 * @Date: 2021-05-30 14:25:11
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-07-18 13:24:46
 * @FilePath: \mall-server\app\controller\web\commonController.js
 */
const { Op } = require("sequelize");

const { errorMsg, successMsg } = require('../../middleware/errorMessage');


const { HeaderList, Cart, Address } = require("../../models/web/common");

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
    await Cart.findAll({
      where: {
        userId
      },
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

    // ctx.body = {productObj}
    // return

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


  // 订单列表
  async orderList(ctx) {
    const userId = ctx.session.userId;
    await Order.findAll({
      where: {
        userId
      }
    }).then(res => {

    })
  },


  // 地址列表
  async addressList(ctx) {
    const userId = ctx.session.userId;
    await Address.findAll({
      where: {
        userId
      }
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
  }

}

module.exports = {
  commonController
}