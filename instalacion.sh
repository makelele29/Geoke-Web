#!/bin/bash
sudo apt-get install build-essential protobuf-compiler python \
                     libprotobuf-dev libcurl4-openssl-dev \
                     libboost-all-dev libncurses5-dev \
                     libjemalloc-dev wget m4
wget https://download.rethinkdb.com/dist/rethinkdb-2.3.5.tgz
tar xf rethinkdb-2.3.5.tgz
cd rethinkdb-2.3.5
./configure --allow-fetch
make
sudo make install
sudo cp /etc/rethinkdb/default.conf.sample /etc/rethinkdb/instances.d/instance1.conf
sudo vim /etc/rethinkdb/instances.d/instance1.conf
sudo /etc/init.d/rethinkdb restart
npm install express-generator -g
express Geoke
cp -r package.json Geoke/
cp -r views/* Geoke/views/
cp -rf public/* Geoke/public/
cp -rf test/ Geoke/
cd Geoke/
npm install
npm install mocha -g
