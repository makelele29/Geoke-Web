var mongoose     = require('mongoose');

// create a schema
var userSchema = new mongoose.Schema({
  nombre: String,
  alias: { type: String, required: true, index:{unique: true} },
  contraseña: { type: String, required: true },
  apellidos: String
});


module.exports= mongoose.model('usuarios', userSchema);
