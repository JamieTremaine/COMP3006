#!/bin/bash

echo "Building backend..."
cd COMP3006-Backend
npm i
npm run build

echo "Building db..."
cd ../COMP3006-db
npm i

echo "Building frontend..."
cd ../COMP3006-Frontend
npm i

cd ../
./build-api.sh
cd ./COMP3006-Frontend
npm run build

echo "Project built"