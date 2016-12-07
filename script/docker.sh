#!/bin/bash

sudo docker build -t geoke .
sudo docker run -d --name mongoDB mongo
sudo docker run --link=mongoDB:mongodb -it geoke
