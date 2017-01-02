var passport = require('passport');
var mongoose = require('mongoose');
var model_usu = require('../models/user.js');

//GET - Devuelve los datos de todos los usuarios
exports.findAll = function(req, res) {
 model_usu.find(function(err, result) {
   if(err) return res.json(500, { mensaje:err.message});
   if(result.length==0) return res.json(500, { mensaje: 'No hay ningun usuario' });
   res.json(200,result);
 });
};

//GET - Devuelve los datos de un usuario especifico
exports.findByAlias = function(req, res) {
  // Si el usuario no tiene ID existe no te deja acceder
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // En caso de acceso
    model_usu
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      })
    }


};

//POST - Insertar nuevo usuario
exports.add = function(req, res) {
console.log(req.body)
 var usu = new model_usu({
   nombre: req.body.nombre,
   alias: req.body.alias,
   apellidos: req.body.apellidos
 });

 usu.setPassword(req.body.password);

 usu.save(function(err) {
    if(err) return res.json(500,{mensaje: 'El usuario ya esta registrado'});
    var token;
    token = usu.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

//PUT - Actualiza usuario
exports.update = function(req, res) {
  model_usu.findOne({alias: req.params.alias},function(err,usu){
    if(err) return res.json(501, { mensaje:err.message});
    if(usu==null) return res.json(502, { mensaje: 'No hay ningun usuario con ese alias' });
    if(req.body.nombre)usu.nombre=req.body.nombre;
    if(req.body.password)usu.setPassword(req.body.password);
    if(req.body.apellidos)usu.apellidos=req.body.apellidos;
    usu.save(function(err,result){
      if(err) return res.json(503,{mensaje:'Hubo un problema al actualizar los datos personales'});
      res.json(200,{mensaje: 'El usuario ha sido actualizado'});
    });

  });

};

//DELETE - Elimina a un usuario
exports.eliminar = function(req, res) {

  model_usu.remove({alias:req.params.alias},function(err, result) {
    if(err) return res.json(500,{mensaje:'El usuario no existe'});
    res.json(200,{mensaje: 'El usuario ha sido eliminado'});
  });

};

exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){
      var token;

      // Si passport tiene algun error
      if (err) {
        res.status(404).json(err);
        return;
      }

      // Si el usuario existe
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      } else {
        // Si el usuario no existe
        res.status(401).json(info);
      }
    })(req, res);

  };
