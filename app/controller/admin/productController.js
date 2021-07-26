/*
 * @Date: 2021-01-25 23:07:15
 * @Description: 商品管理
 * @LastEditors: jun
 * @LastEditTime: 2021-07-24 00:54:35
 * @FilePath: \mall-server\app\controller\admin\productController.js
 */
const sequelize = require('../../../config/db');
const { Op } = require('sequelize');

const { errorMsg, successMsg } = require('../../middleware/errorMessage');

const validoatorTool = require('../../middleware/validator');

// 产品管理
const { Goods, Category } = require('../../service/product');

const { ParameterException } = require('../../middleware/httpException');

const { Classify, Product, ExhibitionImg } = require("../../models/admin/product");

// 商品列表
const productController = {
  // 获取商品列表
  async list(ctx) {
    let params = ctx.query;
    if (!params.page || !params.limit) {
      const error = new ParameterException();
      throw error;
    }
    if (!params.keywords) {
      params.keywords = '';
    }
    let result = await Goods.list(params.keywords, (parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
    if (result) {
      ctx.body = successMsg('获取成功', result);
    }
  },

  /**
   * @description: 添加商品
   * @param {Object}
   * @return {Object}
   */
  async add(ctx) {
    let params = ctx.request.body;
    // 验证字段
    validoatorTool.addProduct(params);


    const result = await sequelize.transaction(async (t) => {
      const product = await Product.create(params, { transaction: t });

      params.imgList.forEach(item => {
        item.productId = product.id;
      })

      await ExhibitionImg.bulkCreate(params.imgList, { transaction: t });

      return product;
    })
    ctx.body = successMsg('添加成功', result)
  },


  /**
   * @description: 商品详情
   * @param {String} productId
   * @return {Object}
   */

  async detail(ctx) {
    let { id } = ctx.query;
    if (!id) {
      ctx.body = (400, '', '商品id不能为空');
      return
    }
    await Product.findOne({
      include: ['imgList'],
      where: {
        id
      }
    }).then(res => {
      if (res) {
        ctx.body = successMsg('获取成功', res);
      }
    })
  },



  /**
   * @description: 更新
   */
  async update(ctx) {
    let params = ctx.request.body;

    validoatorTool.addProduct(params);

    const result = await sequelize.transaction(async (t) => {
      const product = await Product.update(params, {
        where: {
          id: params.id
        }
      }, { transaction: t });

      await ExhibitionImg.destroy({
        where: {
          productId: params.id
        }
      }, { transaction: t })

      params.imgList.forEach(item => {
        item.productId = params.id;
      })

      await ExhibitionImg.bulkCreate(params.imgList, { transaction: t });
      return product;
    })
    ctx.body = successMsg('更新成功', result);
  },


  /**
   * @description: 删除商品
   * @param {String} productId
   */
  async delete(ctx) {
    let { id } = ctx.request.body;
    if (!id) {
      ctx.body = errorMsg('商品id不能为空');
      return
    }


    const resultVal = await sequelize.transaction(async (t) => {
      const productData = await Product.destroy({
        where: {
          id
        }
      }, { transaction: t });

      await ExhibitionImg.destroy({
        where: {
          productId: id
        }
      })
      return productData;
    })
    ctx.body = successMsg('删除成功', resultVal);
  },
}

/* ------------商品分类--------------- */
const classifyController = {
  // 分类列表
  async list(ctx) {
    let params = ctx.query;
    let result = await Category.list(params.keywords, (parseInt(params.page) - 1) * parseInt(params.limit), parseInt(params.limit));
    // let result = await Category.list();
    if (result) {
      ctx.body = successMsg('获取成功', result);
    }
  },

  // 添加分类
  async add(ctx) {
    let params = ctx.request.body;
    /* let result = await Category.add(params);
    if (result) {
      ctx.body = successMsg('添加成功');
    } */
    await Classify.create({
      name: params.name,
      img: params.img
    }).then(res => {
      ctx.body = successMsg('添加成功');
    }).catch(err => {
      ctx.body = errorMsg('添加失败', err)
    })
  },

  // 分类详情
  async detail(ctx) {
    let { id } = ctx.params;
    await Classify.findOne({
      where: {
        id
      }
    }).then(res => {
      ctx.body = successMsg('获取成功', res)
    })
  },

  // 编辑分类
  async update(ctx) {
    let { name, img, id } = ctx.request.body;
    await Classify.update({
      name,
      img
    }, {
      where: {
        id
      }
    }).then(res => {
      ctx.body = successMsg('更新成功');
    })
  },

  // 删除分类
  async delete(ctx) {
    const { id } = ctx.params;
    await Classify.destroy({
      where: {
        id
      }
    }).then(res => {
      if (res) {
        ctx.body = successMsg('删除成功')
      }
    })
  },

  // 分类下的商品列表
  async goodsList(ctx) {
    let params = ctx.query;
    let result = await Category.goodsList(params.id);
    if (result) {
      ctx.body = successMsg('获取成功', result);
    }
  }
}


module.exports = {
  productController,
  classifyController
}