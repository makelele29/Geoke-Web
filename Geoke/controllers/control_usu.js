var mongoose = require('mongoose');
var Usu = require('../models/user.js');

//GET - Devuelve los datos de todos los usuarios
exports.findAll = function(req, res) {
 Usu.find(function(err, Usus) {
   if(err)res.json(500, { error:err.message});
   console.log('GET /Usuario')
   res.json(200,Usus);
 });
};

//GET - Devuelve los datos de un usuario especifico
exports.findById = function(req, res) {
  var resu=Usu.find({alias:req.params.alias});
   if(resu.lenght()==0) res.json(500, { error: 'No hay ningun usuario registrado' });
   console.log('GET /Usuario/' + req.params.alias);
   res.json(Usu);

};

//POST - Insertar nuevo usuario
exports.add = function(req, res) {
 console.log('POST');
 console.log(req.body);
 var Usu = new Usu({
   alias: req.body.alias,
   contraseña: req.body.pass,
   nombre: req.body.nombre,
   apellidos: req.body.apellidos
 });
 Usu.save(function(err, Usu) {
   if(err) res.json(500, {error: 'El usuario ya esta registrado'});
   res.json(200,Usu);
 });
};

//PUT - Actualiza usuario
exports.update = function(req, res) {
  var result=Usu.findAndModify({
    query: { alias: req.body.alias},
    update: { $set: { nombre:req.body.nombre,apellidos: req.body.apellidos } }
  });
  if(result==null)
    res.json(500,{mensaje:'Hubo un problema al actualizar los datos personales'});
  res.json(200,{mensaje: 'El usuario ha sido actualizado'});
};

//DELETE - Elimina a un usuario
exports.delete = function(req, res) {
  var result=Usu.deleteOne({alias:req.body.alias});
  if(result.deletedCount==0)
    res.json(500,{mensaje:'El usuario no existe'});
  res.json(200,{mensaje: 'El usuario ha sido eliminado'});
};
