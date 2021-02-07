/*
 * @Date: 2020-12-24 23:49:17
 * @Description: 
 * @LastEditors: jun
 * @LastEditTime: 2021-02-08 00:26:09
 * @FilePath: \mall-server\config\db.js
 */
/* var mysql = require('mysql');
const { dbConfig } = require('./mysql');
var pool = mysql.createPool(dbConfig);

var db = {};

db.query = function (sql, params) {

  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {

      if (err) {
        reject(err);
        return;
      }

      connection.query(sql, params, function (error, results, fields) {
        console.log('aaaa',`${ sql }=>${ params }`);
        // 释放连接
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resultData = JSON.stringify(results);
        results = JSON.parse(resultData);
        resolve(results);
      });

    });
  });
}
// 导出对象
module.exports = db; */



const Sequelize = require('sequelize')
const sequelize = new Sequelize('mall_db','root','458677',{
    host:'localhost',
    dialect:'mysql',
    logging: true, // 是否显示SQL语句
    timezone: '+08:00',  //东八时区
    operatorsAliases:false,
    dialectOptions:{
        //字符集
        charset:'utf8mb4',
        // collate:'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    define: {
      timestamps: false, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
      paranoid: true, // 是否自动创建deletedAt字段
      createdAt: "create_time", // 重命名字段
      updatedAt: "update_time",
      deletedAt: "delete_time",
      underscored: true, // 开启下划线命名方式，默认是驼峰命名
      freezeTableName: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'  //东八时区
})

sequelize.sync({
  force: false // 每次启动都重新自动创建表
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.log('Unable to connect to the database', err)
  })

module.exports = sequelize