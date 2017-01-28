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

##### Ansible

###### Creación de variables

Por comodidad y por tenerlo más a mano me he creado un archivo __vars.yml__ para guardar algunas variables:


```yml

---

# Variables para el despliegue
project_name: IV16-17
project_repo: https://github.com/makelele29/Geoke-Web.git
proyect_path: Geoke

# Dependencias del sistema
system_packages:
  - build-essential
  - npm
  - nodejs-legacy
  - git
  - mongodb

```

y nos hemos creado el provisionamiento de Ansible, el cual instalara los paquetes necesario, copiara nuestro repositorio y  instalar los módulos necesarios de la aplicación:

__playbook.yml__

```yml

---
- hosts: all
  remote_user: vagrant
  vars_files:
    - vars.yml
  gather_facts: no
  become: yes
  become_method: sudo
  tasks:
    - name: Instalar paquetes del sistema
      apt: pkg={{ item }} update-cache=yes cache_valid_time=3600
      with_items: "{{ system_packages }}"

    - name: Descargar fuentes
      git: repo={{project_repo}} dest={{proyect_path}} clone=yes force=yes
    - name: Run npm install
      npm: path={{proyect_path}}

```

Para evitar algunos errores durante el provisionamiento uso el archivo __ansible.cfg__

```cfg

[ssh_connection]
control_path = %(directory)s/%%h-%%p-%%r

```
##### Configuracion Portal Azure

Primero nos vamos a la web de [Azure](https://portal.azure.com/) y nos logueamos con nuestra cuenta.

Una vez dentro creamos una aplicación, para ello nos vamos al panel de la izquierda y le damos a Azure Active Directory --> Registro de Aplicaciones --> Agregar.

![Agregar](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202017-01-28%2012-00-56_zpsfdlijdph.png)

La URL de inicio de sesión se pone una cualquiera por ahora y mas adelante se cambiaría a la de la maquina virtual.

Una vez creada ya estará registrada, pues ahora debemos averiguar las siguientes variables:

__AZURE_CLIENT_ID__: Entramos dentro de la aplicación que hemos creado y copiamos el id de la aplicación.

__AZURE_CLIENT_SECRET__: En el mismo sitio que estamos en el panel de la derecha le damos a claves. Dentro le definimos un nombre y una duración y al guardar nos aparecerá la clave que debemos copiar.

__AZURE_TENANT_ID__: Esta en Azure Active Directory --> Propiedad, el que pone id de directorio.

__AZURE_SUBSCRIPTION_ID__: Esta en Más servicios -> Suscripciones, una vez allí solo debemos copiar el id de la suscripción que tengamos, siempre y cuando esa suscripción tenga habilitada la creación de máquinas virtuales.

Exportamos las variables con los campos que hemos obtenido de Azure.

```bash

export AZURE_TENANT_ID="****************"
export AZURE_CLIENT_ID="****************"
export AZURE_CLIENT_SECRET="****************"
export AZURE_SUBSCRIPTION_ID="****************"

```

Ahora debemos darle permisos a nuestra aplicación para que pueda crearse la máquina virtual desde Vagrant.

En el panel de la izquierda abajo del todo Más servicios --> Suscripciones, allí accedemos a la suscripción que pusimos anteriormente, le damos a Control de acceso (IAM) --> Agregar.

Nos creamos un rol de tipo Colaborador, ya que debe tener permisos para crear la máquina virtual y en agregar usuarios vamos a añadir nuestra aplicación antes creada en mi caso geoke pues la busco, la agrego y le damos a aceptar.

![roles](http://i1356.photobucket.com/albums/q726/Makelele_Junior/Captura%20de%20pantalla%20de%202017-01-28%2012-42-01_zpserj1ojaz.png)

##### Configuración Vagrant

Solo nos falta el fichero Vagrantfile que sera el encargado de crear la máquina virtual con la configuración que le especifiquemos.

__Vagrantfile__

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|

  config.vm.box = 'azure'
  config.vm.box_url = 'https://github.com/msopentech/vagrant-azure/raw/master/dummy.box' #Caja base vacía
  config.vm.network "private_network",ip: "192.168.11.4", virtualbox__intnet: "vboxnet0" #Ip privada
  config.vm.hostname = "localhost"
  config.vm.network "forwarded_port", guest: 80, host: 80

  # use local ssh key to connect to remote vagrant box
  config.vm.provider :azure do |azure, override|
    config.ssh.private_key_path = '~/.ssh/id_rsa'
    azure.vm_image_urn = 'canonical:UbuntuServer:16.04-LTS:16.04.201701130' #Imagen base del sistema
    azure.vm_size = 'Basic_A0' #Tamaño (recursos) de la MV
    azure.location = 'westeurope'
    azure.tcp_endpoints = '80:80'
    azure.vm_name = "Geoke"

    azure.tenant_id = ENV['AZURE_TENANT_ID']
    azure.client_id = ENV['AZURE_CLIENT_ID']
    azure.client_secret = ENV['AZURE_CLIENT_SECRET']
    azure.subscription_id = ENV['AZURE_SUBSCRIPTION_ID']
  end

  # Provisionar con ansible
  config.vm.provision "ansible" do |ansible|
    ansible.sudo = true
    ansible.playbook = "playbook.yml"
    ansible.verbose = "-vvvv"

    ansible.host_key_checking = false
  end

end


```

##### Instalación de la máquina virtual

    vagrant up --provider=azure

Si tuviesemos problemas con Ansible a la hora de provisionar la máquina se ejecutaría el siguiente comando, después de realizar modificaciones en Ansible.

    vagrant provision
