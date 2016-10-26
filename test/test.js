var db = require('rethinkdb');
var assert = require('assert');
var rethinkdb = require('../public/javascripts/rethinkBD.js');
//Funcion para conectar a la base de datos

//-----------------------------------------------------------------------------------------------------------------------
// Función para las pruebas con la base de datos
describe("Prueba Test",function(){

  
  var conexion = null;
  db.connect( {host: 'localhost', port: 28015}, function(err, conn) {
		console.log("prueba");
     assert.fail(error,"Fallaco");
      conexion = conn;
  })
 console.log("aqui");
 db.db('rutas').isEmpty().run(conexion,function(error,result){
    if(!error){
      db.dbCreate('rutas').run(conexion, function(){
			assert.fail(error,"Fallaco");
        console.log("Rutas creada con exito");
      });
    }else {
      console.log("Errorororor");
    }
  } );
 console.log("aqui");


});

