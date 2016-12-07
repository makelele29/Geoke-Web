## Web Geoke

***

[![Build Status](https://travis-ci.org/makelele29/Geoke-Web.svg?branch=master)](https://travis-ci.org/makelele29/Geoke-Web)
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/makelele29/Geoke-Web)

### Descripción

La web está diseñada para darle apoyo a la aplicación en android Geoke (TFG), dicha aplicación consiste en jugar a las gymkhanas creadas cerca de ti, ya sean tuyas o de otro usuario.

Está diseñada especialmente para ayuntamientos y colegios que son los que más utilizan este tipos de juegos.

Consistirá en que los usuarios puedan crear, eliminar y editar gymkhanas, además, dichos usuarios tendrán la oportunidad de ver estadísticas sobre las gymkhanas que han jugado y los ranking de los mejores de cada gymkhana.


### Servicios necesarios

###### Servidor de base de datos

- Base de datos para usuarios
- Base de datos para la creación de gymkhanas, estadisticas, ranking, etc.
- Base de datos para almacenar las localizaciones de los usuario

### Requisitos

- Mongodb server
- MySQL server
- nodejs
- npm

### Ejecución

###### Instalación

```bash

npm install
sudo service mongod start
npm start

```

###### Test

```bash

npm test

```

### Instalación del contenedor

Instalar [docker](https://docs.docker.com/engine/installation/)

Hay dos maneras de crear el contenedor:

- __Local__: Se deberá clonar o copiar el repositorio y ejecutar el siguiente script.

      ./script/docker.sh

- __DockerHub__: Solo se tendrá que ejecutar estos comandos.

      docker run -d --name mongoDB mongo
      docker pull makelele29/geoke-web
      docker run --link=mongoDB:mongodb -it makelele29/geoke-web
