# Step 1: Build the app in image 'builder'
FROM node:12-alpine AS node_builder

WORKDIR /usr/src/app

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY angular.json /usr/src/app/angular.json
COPY tsconfig.json /usr/src/app/tsconfig.json
COPY tsconfig.app.json /usr/src/app/tsconfig.app.json

RUN npm install
RUN npm install -g add @angular/cli@9.0.7