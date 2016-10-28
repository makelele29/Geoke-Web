var express = require('express');
var router = express.Router();
var UsuCtrl= require('../controllers/control_usu');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Api Rest para el tramite de información');
});
router.route('/usuarios')
 .get(UsuCtrl.findAll)
 .post(UsuCtrl.add);

router.route('/usuarios/:id') 
 .get(UsuCtrl.findById)
 .put(UsuCtrl.update)
 .delete(UsuCtrl.delete);

module.exports = router;
