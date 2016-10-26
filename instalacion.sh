#!/bin/bash
npm install express-generator -g
express Geoke
cp -r package.json Geoke/
cp -r views/* Geoke/views/
cp -rf public/* Geoke/public/
cp -rf test/ Geoke/
cd Geoke/
npm install
npm install mocha -g
