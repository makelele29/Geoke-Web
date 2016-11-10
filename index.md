---
layout: index
---

Aqui se mostraran los cambios, ejercicios y evolución del proyecto que han pedido en los diferentes hitos.

## Hito 0

Corregido errores en la entrega del hito 0


[Milestone del hito 0](https://github.com/makelele29/Geoke-Web/milestone/2)

***

## Hito 1
Aqui se mostraran los cambios, ejercicios y evolución del proyecto que han pedido en el hito 1.

### Milestone

[Hito 1](https://github.com/makelele29/Geoke-Web/milestone/1)

[Ejercicios del tema 1](https://github.com/makelele29/Ejercicios-IV/milestone/1?closed=1)

### Tema 1

[Ejercicios](https://makelele29.github.io/Ejercicios-IV/)


### Proyecto

[Descripción del proyecto](https://github.com/makelele29/Geoke-Web/blob/master/README.md)

***

## Hito 2


### Milestone

[Hito 2](https://github.com/makelele29/Geoke-Web/milestone/3?closed=1)

[Ejercicios del tema 2](https://github.com/makelele29/Ejercicios-IV/commits/master/Tema%202.md)

### Tema 2

[Ejercicios](https://github.com/makelele29/Ejercicios-IV/blob/master/Tema%202.md)


### Proyecto

#### Integración continua

##### Herramientas

Para la correcta realización de mi web he necesitado:

- Mongodb server
- MySQL server
- nodejs
- npm

##### Construcción

He añadido en __packaje.json__ todas las dependencias necesarias para el proyecto, así como las pruebas de test y ejecución del servidor.

```json

{
  "name": "geoke",
  "version": "1.0.0",
  "description": "Página Web de la aplicación Geoke.",
  "private": true,
  "dependencies": {
    "express": "~4.0.0",
    "serve-favicon": "~2.3.0",
    "morgan": "~1.0.0",
    "cookie-parser": "~1.0.1",
    "body-parser": "~1.0.0",
    "debug": "~0.7.4",
    "jade": "~1.3.0",
    "mysql": "~2.9.0",
    "async": "^2.1.2",
    "express-session": "^1.14.1",
    "grunt": "^1.0.1",
    "grunt-docco": "^0.5.0",
    "mongoose": "^4.2.5",
    "chai": "^3.5.0",
    "chai-http": "^3.0.0",
    "sequelize": "^3.24.6"
  },
  "scripts": {
    "start": "nodejs ./bin/www",
    "test": "mocha "
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/makelele29/Geoke-Web.git"
  },
  "author": "Javier Castillo Palomo",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/makelele29/Geoke-Web/issues"
  },
  "homepage": "https://github.com/makelele29/Geoke-Web#readme",
  "devDependencies": {
    "mocha": "^3.1.2"
  }
}

```

##### Ejecución

```bash

npm install
sudo service mongod start
npm start

```

##### Test

Para la realización de los test he utilizado __mocha__, __chai__ y __chai-http__.
Para la ejecución de los test se utilizara el comando:

```bash

npm test

```

#### Integación continua

He utilizado Travis y por tanto he añadido al repositorio __.travis.yml__

```yml

language: node_js
node_js:
  - "0.11.16"
  - "4.6.1"
  - "6.9.0"
services:
  - mongodb
  - mysql
notifications:
    on_success: never
    on_failure: never

```

***

## Hito 3


### Milestone

[Ejercicios del tema 3](https://github.com/makelele29/Ejercicios-IV/milestone/3?closed=1)

### Tema 3

[Ejercicios](https://github.com/makelele29/Ejercicios-IV/blob/master/Tema%203.md)


### Proyecto

#### Desplegando a la nube: Platform as a Service

El despliege lo he realizado en heroku, he creado un script para que la instalación de heroku sea más sencillo, por si alguien quisiera desplegarlo.

```bash


#!/bin/bash
sudo apt-get install wget
wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh   # descargar herramienta heroku CLI
cd ..
sudo heroku login
sudo heroku apps:create --region eu geoke
sudo heroku addons:create mongolab:sandbox
echo "En username darle a enter y en password añadir el codigo del token"
sudo heroku auth:token
git push heroku master
sudo heroku ps:scale web=1

```
Para que la subida a heroku sea más fácil he añadido en heroku la subida automática desde github siempre y cuando supere la CI.

![](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202016-11-09%2020-00-40_zpsisc2fmsn.png)


He añadido una parte visual de la web utilizando Angularjs y haciendo peticiones ajax para login y el registro.

![](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202016-11-10%2001-00-22_zpsvmjsr02w.png)

Después de añadir un usuario podemos ver en __api/usuario__ el usuario añadido

![](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202016-11-10%2001-03-06_zpsuiehqsd0.png)
