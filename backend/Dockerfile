FROM node:18-alpine as builder

WORKDIR /app

ADD package.json package-lock.json /app/
RUN npm ci
ADD . /app/

CMD node ./src/main.js