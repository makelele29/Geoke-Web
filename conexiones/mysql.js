var sequelize=require('./sequelize.js');
var Sequelize = require('sequelize');
var participa=require('../models/PARTICIPA.js');
//Funcion para conectar a la base de datos
function BD(res){
  this.res=res;
  this.addParticipa=function(alias,id,duracion,aciertos,completada){
   var par=new participa(sequelize,Sequelize);
   par.sync({force: false}).then(function () {
     return par.create({
          ALIAS: alias,
          ID_GYMKHANA: id,
          DURACION: duracion,
          ACIERTOS: aciertos,
          COMPLETADA: completada
        });
    }).then(function(){
      res.json({succes:true});
    }).catch(function(error) {
      res.json({succes:false})
    });
  }
}

module.exports=BD;
