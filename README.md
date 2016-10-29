## Web Geoke

***

[![Build Status](https://travis-ci.org/makelele29/Geoke-Web.svg?branch=master)](https://travis-ci.org/makelele29/Geoke-Web)

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
