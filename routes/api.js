var express = require('express');
var router = express.Router();
var UsuCtrl= require('../controllers/control_usu');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Api Rest para el tramite de información');
});
router.route('/usuario')
  .post(UsuCtrl.add)
  .get(UsuCtrl.findAll);


router.route('/usuario/:alias')
 .get(UsuCtrl.findByAlias)
 .put(UsuCtrl.update)
 .delete(UsuCtrl.eliminar);
router.route("/login")
  .post(UsuCtrl.login);
module.exports = router;
