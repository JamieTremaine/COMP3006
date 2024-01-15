#!/bin/bash
echo "Building client api..."

cd COMP3006-Backend
npm run build-spec
cp ./spec.json ../COMP3006-Frontend/src/app/api

cd ../COMP3006-Frontend
npm run build-spec
