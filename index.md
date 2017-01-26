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

## Hito 4

### Milestone

[Ejercicios del tema 3](https://github.com/makelele29/Ejercicios-IV/milestone/4?closed=1)

[Hito 4](https://github.com/makelele29/Geoke-Web/issues/19)

### Tema 4

[Ejercicios](https://github.com/makelele29/Ejercicios-IV/blob/master/Tema%204.md)


### Proyecto

#### Técnicas de virtualización Contenedores para pruebas

Para ver como sincronizar DockerHub con nuestro GitHub es bastante simple. Antes de nada hay que crearse una cuenta en dockerhub.

Para asociarla con github tenemos que clickar sobre Create y elegimos la opción Create Automated Build. Nos da la opción de crearla mediante GitHub y deberemos elegir el repositorio de nuestro proyecto.

[Mi cuenta de DockerHub](https://hub.docker.com/r/makelele29/geoke-web/)

Para ello ha sido necesario crearse un Dockerfile en el proyecto:

``` Dockerfile

FROM node:latest

#Autor
MAINTAINER JAVIER CASTILLO PALOMO  <jacastillo@correo.ugr.es>

# Adds files from the host file system into the Docker container.
ADD . /routes
ADD . /models

# Sets the current working directory for subsequent instructions
WORKDIR /routes
WORKDIR /models

RUN npm install



#expose a port to allow external access
EXPOSE 8080


CMD ["npm", "start"]

```

###### Instalación del contenedor

Instalar [docker](https://docs.docker.com/engine/installation/)

Hay dos maneras de crear el contenedor:

- __Local__: Se debera clonar o copiar el repositio y ejecutar el siguiente script.

      ./script/docker.sh

- __DockerHub__: Solo se tendra que ejecutar estos comandos.

      docker run -d --name mongoDB mongo

      docker pull makelele29/geoke-web

      docker run --link=mongoDB:mongodb -it makelele29/geoke-web

###### Instalación en Local

![local](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202016-12-07%2001-58-31_zpsxpeukxj4.png)

###### Instalación con DockerHub

![DockerHub](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202016-12-07%2002-01-51_zps6chzhqxs.png)

## Hito 5


### Milestone



### Tema 5 y 6

[Ejercicios 5](https://github.com/makelele29/Ejercicios-IV/blob/master/Tema%205.md)

[Ejercicios 6](https://github.com/makelele29/Ejercicios-IV/blob/master/Tema%206.md)


### Proyecto

#### Diseño del soporte virtual para el despliegue de una aplicación


Para el despliegue de la aplicación en IaaS, voy a usar Vagrant para la creación de máquinas virtuales, Ansible para el provisionamiento de dichas máquinas y las máquinas virtuales se crearán en una cuenta de Azure.

##### Instalación de Vagrant

Instalar [Vagrant](https://www.vagrantup.com/downloads.html)

Instalamos el provisionador de Azure para Vagrant

    vagrant plugin install vagrant-azure --plugin-version '2.0.0.pre1'

##### Instalación y configuración de Azure

Instalar Azure

    npm install -g azure-cli

El siguiente paso es loguearse y conseguir información de las credenciales de Azure, para ello el segundo comando es para el modo Gestión de Servicios:

    azure login
    azure config mode asm
    azure account download

Para importar el certificado debes darle al enlace que nos aparece y se descargara el certificado, ahora debemos usar:

    azure account import <ruta del certificado>

Lo siguiente que debemos hacer es generar los certificados que se van a subir a Azure:

    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout azurevagrant.key -out azurevagrant.key
    chmod 600 azurevagrant.key
    openssl x509 -inform pem -in azurevagrant.key -outform der -out azurevagrant.cer

Nos vamos a la página de [Azure](https://manage.windowsazure.com/) y en el panel de la izquierda nos vamos a configuración -> certificados de administración, le damos al boton de cargar que aparece abajo y añadimos el certificado creado arriba.

![](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202017-01-26%2017-27-18_zpsu0grbyul.png)
