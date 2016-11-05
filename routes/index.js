var express = require('express');
var router = express.Router();
var mysql = require('../conexiones/mysql.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/addParticipacion', function(req, res) {
	var bd=new mysql(res);
	bd.addParticipa('alias',4,3600,5,1);

});
module.exports = router;
