#!/bin/bash

echo "Testing backend..."
cd COMP3006-Backend
npm run test

echo "Testing frontend..."
cd ../COMP3006-Frontend
npm run test:headless

exit 0