var mongoose     = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db');
// create a schema
var userSchema = new mongoose.Schema({
  nombre: String,
  alias: { type: String, required: true, index:{unique: true} },
  contraseña: { type: String, required: true },
  apellidos: String
});


module.exports= mongoose.model('users', userSchema);
