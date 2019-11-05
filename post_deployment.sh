#!/bin/bash
echo 'installing requirements...'
yarn install
echo 'starting prod server in the background...'
forever start -c "yarn start" ./
echo 'server started, now exiting...'
exit
