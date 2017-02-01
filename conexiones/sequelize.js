var Sequelize = require('sequelize');
var config=require('../config/config')
var sequelize = new Sequelize(config.db_Postgres);
module.exports=sequelize;
