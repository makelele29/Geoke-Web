var Sequelize = require('sequelize');
var sequelize = new Sequelize('GEOKE', 'root', '1', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
module.exports=sequelize;
