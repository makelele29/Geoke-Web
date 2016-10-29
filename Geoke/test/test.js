
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('Test de usuarios (Mongodb)', function() {
  it('Deberia añadir Javi con contraseña 12345a',function(done){
    chai.request(server)
    .post('/api/usuario')
    .send({nombre:'javier', alias: 'Javi',pass: '12345a',apellidos:'Castillo'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();

    });

  });
  it('Deberia no añadir otro Javi con contraseña 12345a',function(done){
    chai.request(server)
    .post('/api/usuario')
    .send({nombre:'javier', alias: 'Javi',pass: '12345a',apellidos:'Castillo'})
    .end(function(err, res){
      res.should.have.status(500);
      res.should.be.json;
      done();

    });

  });
  it('Deberia iniciar sesion con Javi t contraseña 12345a',function(done){
    chai.request(server)
    .post('/api/login')
    .send({ alias: 'Javi',pass: '12345a'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();

    });
  });
    it('Deberia no iniciar sesion con Jav y contraseña 12345',function(done){
      chai.request(server)
      .post('/api/login')
      .send({ alias: 'Jav',pass: '12345'})
      .end(function(err, res){
        res.should.have.status(500);
        res.should.be.json;
        done();

      });


  });

});
