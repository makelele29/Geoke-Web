var assert = require('assert');
var rethinkdb = require('../public/javascripts/mongodb.js');
//Funcion para conectar a la base de datos

//-----------------------------------------------------------------------------------------------------------------------
// Función para las pruebas con la base de datos
describe("Prueba Test",function(){
  describe("Pruebas con MongoDB",function(){
    it("Nuevo usuario, alias -> javielele  contraseña -> IV" ,function(){
      var bd=new BDMongo();
      var resu=bd.registrar("javielele","Javier","Castillo Palomo","IV",);
      assert.fail(resu,"Ese usuario ya esta registrado");
    });
    it("Error al añadir el mismo alias, alias -> javielele  contraseña -> IV" ,function(){
      var bd=new BDMongo();
      var resu=bd.registrar("javielele","Javier","Castillo Palomo","IV",);
      assert.ok(resu,"¿Este usuario se ha registrado con existo? Imposible!!");
    });
    it("Comprobar que el usuario esta en la BD, alias -> javielele  contraseña -> IV" ,function(){
      var bd=new BDMongo();
      var resu=bd.login("javielele","IV",);
      assert.fail(resu,"El usuario no esta en la BD");
    });
    it("Comprobar que el usuario no esta en la BD, alias -> javielele  contraseña -> macarena" ,function(){
      var bd=new BDMongo();
      var resu=bd.login("javielele","macarena",);
      assert.fail(resu,"¿El usuario esta? ¿enserio? enga ya....");
    });
  });




});
