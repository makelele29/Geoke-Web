var db = require('rethinkdb');
var assert = require('assert');
function rethinkdb(){
  var conexion = null;
  db.connect( {host: 'localhost', port: 8080}, function(err, conn) {
      if (err) throw err;
      conexion = conn;
  })
  db.db('rutas').isEmpty().run(conexion,function(error,result){
    if(!error){
      db.dbCreate('rutas').run(conexion, function(){
        console.log("Rutas creada con exito");
      });
    }else {
      console.log("Errorororor");
    }
  } );
}
module.exports=rethinkdb;
