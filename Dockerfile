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
