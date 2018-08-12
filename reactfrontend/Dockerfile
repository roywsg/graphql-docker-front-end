FROM node:10.8.0-alpine

WORKDIR /usr/src/app

RUN yarn global add serve

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["serve", "-s", "build"]