#!/bin/bash
echo 'installing requirements...'
yarn install
echo 'starting prod server in the background...'
pm2 start npm -- start --watch
echo 'server started, now exiting...'
exit
