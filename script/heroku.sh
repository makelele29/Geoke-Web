#!/bin/bash
#sudo apt-get install wget
#wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh   # descargar herramienta heroku CLI
cd ..
sudo heroku login
sudo heroku apps:create --region eu geoke
sudo heroku addons:create mongolab:sandbox
echo "En username darle a enter y en password añadir el codigo del token"
sudo heroku auth:token
git push heroku master
sudo heroku ps:scale web=1

