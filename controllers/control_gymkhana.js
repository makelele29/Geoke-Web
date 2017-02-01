var sequelize=require('../conexiones/sequelize.js');
var Sequelize = require('sequelize');
var gymkhana=require('../models/GYMKHANA.js');
var mongoose = require('mongoose');
var model_usu = require('../models/user.js');
var misiones=require('../models/MISIONES.js');
//POST - Insertar nuevo usuario
exports.add = function(req, res) {
  if (!req.payload._id) {
    return res.status(401).json({
      data : "Usted no tiene autorización"
    });
  } else {
    // En caso de acceso
    
    model_usu
      .findById(req.payload._id)
      .exec(function(err, user) {
        var par=new gymkhana(sequelize,Sequelize);
        par.sync({force: false}).then(function () {
          return par.create({
               username: req.payload.alias,
               nombre_gymk: req.body.nombre,
               fecha_ini: req.body.fechaIni,
               fecha_fin: req.body.fechaFin
             });
         }).then(function(result){

           var mis=[]
           mis=req.body.misiones;


             var mi=new misiones(sequelize,Sequelize);

              mi.sync({force: false}).then(function () {
                 for (var mision in mis){
                    var m= mis[mision]
                 mi.create({
                  id_gymkhana: result.id_gymkhana,
                  pregunta: m.pregunta,
                  respuesta1:m.respuesta1,
                  respuesta2:m.respuesta2,
                  respuesta3:m.respuesta3,
                  respuesta4:m.respuesta4,
                  respuesta_correcta: m.correcta,
                  latitud: m.geo.lat,
                  longitud: m.geo.lng
                   }).catch(function(error) {
                     return res.status(500).json({data:error})
                   });
                 }
                 return res.json(200,{data:"Gymkhana creada con exito"})
               })

         }).catch(function(error) {
           return res.status(500).json({data:error})
         });
      })
    }


};

exports.showGymkhanas=function(req,res){
  if (!req.payload._id) {
    res.status(401).json({
        data : "Usted no tiene autorización"
    });
  } else {
    // En caso de acceso
    model_usu
      .findById(req.payload._id)
      .exec(function(err, user) {
        var par=new gymkhana(sequelize,Sequelize);
        par.sync({force: false}).then(function () {
          return par.findAll({where:{'username':req.payload.alias}});
         }).then(function(result){
           res.json(200,{data:result});
         }).catch(function(error) {
           return res.status(500).json({data:error})
         });

      })
    }
}

exports.showMisiones=function(req,res){
  if (!req.payload._id) {
    res.status(401).json({
        data : "Usted no tiene autorización"
    });
  } else {
    // En caso de acceso
    model_usu
      .findById(req.payload._id)
      .exec(function(err, user) {
        var mision=new misiones(sequelize,Sequelize);
        mision.sync({force: false}).then(function () {
          return mision.findAll({where:{'id_gymkhana':req.body.id_gymkhana}});
         }).then(function(result){
           var mi=result;
           var gymk=new gymkhana(sequelize,Sequelize)
           gymk.sync({force:false}).then(function () {
             return gymk.findOne({where:{'id_gymkhana':req.body.id_gymkhana}});
            }).then(function(result){
              res.json(200,{gymkhana:result,misiones:mi});
            })
         }).catch(function(error) {
           return res.status(500).json({data:error})
         });

      })
    }
}
