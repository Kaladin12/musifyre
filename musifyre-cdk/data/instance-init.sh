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

# Start the server using pm2
npm install pm2 -g
pm2 start npm -- start

# Wait for the server to start (adjust the sleep time as needed)
sleep 10

# Show status of the running applications managed by pm2
pm2 status
