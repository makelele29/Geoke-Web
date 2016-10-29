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
  model_usu.findOne({alias:req.params.alias},function(err, result){
    if(err) return res.json(500, { mensaje:err.message});
    if(result==null) return res.json(500, { mensaje: 'No hay ningun usuario con ese alias' });
    res.json(200,result);
  });

};

//POST - Insertar nuevo usuario
exports.add = function(req, res) {
 var usu = new model_usu({
   nombre: req.body.nombre,
   alias: req.body.alias,
   contraseña: req.body.pass,
   apellidos: req.body.apellidos
 });

 usu.save(function(err, result) {
   if(err) return res.json(500,{mensaje: 'El usuario ya esta registrado'});
   res.json(200,result);
 });
};

//PUT - Actualiza usuario
exports.update = function(req, res) {
  model_usu.findOne({alias: req.params.alias},function(err,usu){
    if(err) return res.json(501, { mensaje:err.message});
    if(usu==null) return res.json(502, { mensaje: 'No hay ningun usuario con ese alias' });
    if(req.body.nombre)usu.nombre=req.body.nombre;
    if(req.body.pass)usu.contraseña=req.body.pass;
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
//POST - Te confirma si el usuario esta registrado
exports.login = function(req, res) {
  model_usu.findOne({alias:req.body.alias, contraseña:req.body.pass},function(err,result){
    if(err) return res.json(500, { mensaje: 'Error en la Base de datos' });
    if(result==null) return res.json(500, { mensaje: 'Necesita registrarse.' });
    res.json(200,{mensaje: 'Inicio de sesión con '+req.body.alias});
  });



};
