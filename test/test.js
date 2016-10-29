
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
  it('Deberia mostrar al usuario con alias Javi',function(done){
      chai.request(server)
      .get('/api/usuario/'+'Javi')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('Deberia no mostrar al usuario con alias Pepe',function(done){
      chai.request(server)
      .get('/api/usuario/'+'Pepe')
      .end(function(err, res){
        res.should.have.status(500);
        res.should.be.json;
        done();
      });
  });
  it('Deberia actualizar a Javi y cambiar la contraseña a IV',function(done){
      chai.request(server)
      .put('/api/usuario/'+'Javi')
      .send({pass:'IV'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('Deberia devolver a todos los usuarios',function(done){
      chai.request(server)
      .get('/api/usuario')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('Deberia eliminar al usuario Javi',function(done){
      chai.request(server)
      .delete('/api/usuario/'+'Javi')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('Deberia no devolver a los usuarios ya que no hay ninguno',function(done){
      chai.request(server)
      .get('/api/usuario')
      .end(function(err, res){
        res.should.have.status(500);
        res.should.be.json;
        done();
      });
  });

});
