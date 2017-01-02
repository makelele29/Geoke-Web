var mongoose     = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config=require('./config/config')
// create a schema
var userSchema = new mongoose.Schema({
  nombre: String,
  alias: { type: String, required: true, index:{unique: true} },
  password: { type: String, required: true },
  apellidos: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.password === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    alias: this.alias,
    nombre: this.nombre,
	 apellidos: this.apellidos,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.clave); 
};
module.exports= mongoose.model('usuarios', userSchema);
