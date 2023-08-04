#!/bin/bash
echo "starting" > test.txt

apt update -y
apt upgrade -y
apt install nodejs npm -y
apt install git -y
git clone --depth=1 --branch=main https://github.com/Kaladin12/musifyre.git
cd musifyre
cd musifyre-app
npm ci
npm install pm2 -g
pm2 start npm -- start
sleep 10
pm2 status
