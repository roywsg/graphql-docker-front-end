# reactfrontend

## Using Docker

In the project folder:

**1.Build image**

```
docker build react/frontend .
```

**2. Start container**

```
docker run -p 5000:5000 react/frontend
```

**3. Open Chrome in http://localhost:5000/**

**4. Login with email: demo, password: demo**

## Using yarn

**1. Install dependancies**

```
yarn install && yarn start
```

**2. Open Chrome in http://localhost:3002** (port might differ due to backend using port 3000)

**3. Login with email: demo, password: demo**

## Concepts used

- axios
- create-react-app
- css grids
- css modules
- custom-react-scripts
- protected routes
- react-transition-group
- react-router
- redux
- redux-thunk
- scss
