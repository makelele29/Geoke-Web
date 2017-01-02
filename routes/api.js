var express = require('express');
var router = express.Router();
var UsuCtrl= require('../controllers/control_usu');
var jwt = require('express-jwt');
var config=require('../config/config')
var auth = jwt({
  secret: config.clave,
  userProperty: config.user
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Api Rest para el tramite de información');
});
router.route('/usuario')
  .post(UsuCtrl.add)
  .get(UsuCtrl.findAll);

router.route('/usuario/:alias',auth)
 .get(UsuCtrl.findByAlias)
 .put(UsuCtrl.update)
 .delete(UsuCtrl.eliminar);

router.route("/login")
  .post(UsuCtrl.login);

module.exports = router;
