var express = require('express');
var router = express.Router();
var UsuCtrl= require('../controllers/control_usu');
var GymkCtrl= require('../controllers/control_gymkhana');
var jwt = require('express-jwt');
var passport = require('passport');
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

router.route('/usuario/:alias')
 .get(UsuCtrl.findByAlias)
 .put(auth,UsuCtrl.update)
 .delete(auth,UsuCtrl.eliminar);

router.route("/login")
  .post(UsuCtrl.login);

router.route("/gymkhana")
  .post(auth,GymkCtrl.add)
  .get(auth,GymkCtrl.showGymkhanas)

router.route("/misiones")
  .post(auth,GymkCtrl.showMisiones)

module.exports = router;
