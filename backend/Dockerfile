FROM node:10.7.0-alpine

WORKDIR /usr/src/app

COPY ["*.json", "*.js", "./"]

# Needed to build dependencies like bcrypt
run apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps

CMD ["npm", "start"]
