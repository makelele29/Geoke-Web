var assert = require('assert');
var mysql = require('../public/javascripts/mysql.js');

//-----------------------------------------------------------------------------------------------------------------------
// Función para las pruebas con la base de datos
describe("Prueba Test",function(){

  // Función para añadir un nuevo alumno
  describe("Insertar alumno",function(){
    it("Deberia añadir un nuevo alumno",function(done){

		    var bd=new mysql();
		    bd.addParticipa("JAvi",3,3600,5,1);
        done();


    });
  });


});
