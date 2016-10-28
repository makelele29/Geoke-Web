
var assert = require('assert');
var BDMongo = require('../public/javascripts/mongodb.js');
//Funcion para conectar a la base de datos

//-----------------------------------------------------------------------------------------------------------------------
// Función para las pruebas con la base de datos
describe("Prueba Test",function(){
  describe("Pruebas con MongoDB",function(){
    it("Nuevo usuario, alias -> javielele  contraseña -> IV" ,function(done){
      var bd=new BDMongo();
      var f=bd.registrar("cr1","Jar","Caillo","I");
      console.log(f);
      assert.fail(f.ok,f.mensaje);
      done();

    });
  });

});
