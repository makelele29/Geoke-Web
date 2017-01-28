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

### Despliegue automático

#### Instalación

- Instalar [Vagrant](https://www.vagrantup.com/downloads.html)
  - Instalar el plugin para Vagrant de Azure
        vagrant plugin install vagrant-azure --plugin-version '2.0.0.pre1'

- Instalar Ansible
      sudo apt-get install ansible

#### Configuración

Para la configuración se deben hacer cambios en el Portal de Azure y sacar varias variables de las cuales se debe hacer export.

```bash

export AZURE_TENANT_ID="****************"
export AZURE_CLIENT_ID="****************"
export AZURE_CLIENT_SECRET="****************"
export AZURE_SUBSCRIPTION_ID="****************"

```

Todo este proceso se explica detalladamente [aqui](https://makelele29.github.io/Geoke-Web/#configuracion-portal-azure)

#### Despliegue

Instalar fabric

      sudo apt install fabric

Las funciones que contiene el fichero __fabfile.py__ son:

- __install__: Para instalar el modulo forever
- __start__: Para ejecutar la aplicación
- __test__: Para ejecutar los test
- __stop__: Para parar la aplicación
- __restart__: Para reiniciar la aplicación
- __pull__: Para actualizar el repositorio y reiniciar la aplicación

Para usarlo simplemente utilizamos el comando:

    fab vagrant@DNS_VM <funcion>
