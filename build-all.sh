#!/bin/bash

echo "Building backend..."
cd COMP3006-Backend
npm i
npm run build

echo "Building frontend..."
cd ../COMP3006-Frontend
npm i

cd ../
./build-api.sh
cd ./COMP3006-Frontend
npm run build
npm run test 

echo "Project built"