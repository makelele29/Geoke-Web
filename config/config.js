if(typeof process.env.MONGODB_PORT_27017_TCP_ADDR !== 'undefined'){
 this.databse='mongodb://' + process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT + '/db'
}else{
 this.database='mongodb://localhost:27017/token'
}
module.exports = {
  'port': process.env.PORT || 8080,
  'bd_Mongo': process.env.MONGODB_URI || this.database,
  'clave': process.env.CLAVE || "1234",
  'user': 'payload',
  'db_Postgres' : process.env.DATABASE_URL

};
