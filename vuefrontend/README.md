# vuefrontend

## Using Docker

In the project folder:

**1. Build image**

```
docker build -t vue/frontend .
```

**2. Start container**

```
docker run -p 8080:8080 vue/frontend
```

**3. Open Chrome in http://localhost:8080/**

**4. Login with email: demo, password: demo**

## Using npm

**1. Install dependancies and start app**

```
yarn install && yarn serve
```

**2. Open Chrome in http://localhost:8080/graphql**

**3. Login with email: demo, password: demo**

## Concepts used

- axios
- css grids
- vue-cli
- vue-router
- vue-router guards
- vuex

## Useful

- https://vuejs.org/v2/cookbook/dockerize-vuejs-app.html

---

## Below are just for reference

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```
