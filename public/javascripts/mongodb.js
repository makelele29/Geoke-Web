var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
function BDMongo(){
  this.conexion=function(){
    MongoClient.connect('mongodb://localhost:27017/registro', function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server.");
      return db;
    });
  }
  this.registrar=function(ali,nom,ape,pass){
    var bd=conexion();
    var resu=bd.Usuarios.insert([{
      alias:ali,
      nombre:nom,
      apellidos:ape,
      contraseña:pass
    }]);
    bd.close();
    return resu.hasErrors();
  }
  this.comprobarUsu=function(ali,pass){
    var bd=conexion();
    var resu=bd.Usuarios.find({alias:ali,contraseña:pass});
    bd.close();
    return resu.hasErrors();

  }
}
module.exports=BDMongo;
