FROM node:10.8.0-alpine

WORKDIR /usr/src/app

RUN yarn global add http-server

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["http-server", "dist"]