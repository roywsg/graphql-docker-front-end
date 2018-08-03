# Backend

## Using docker

In project folder:

**1. Build image**

```
docker build -t graphql/backend .
```

**2. Start container**

```
docker run -p 3000:3000 graphql/backend
```

**3. Open Chrome in http://localhost:8080/graphql**

## Using npm

**1. Install dependancies and start app**
```
npm i && npm start
```

**2. Open Chrome in http://localhost:8080/graphql**

## Graphql queries

**Skills**

```
{
  skills {
    status
    skills{
      name
      type
    }
  }
}
```

**skill**

```
{
  skill(id:"1"){
    status
    name
  }
}
```

**auth**

```
{
  auth(email:"demo",password:"d") {
    status
    token
  }
}
```

**addSkill**

```
addSkill(id:"6",name:"Docker",level:3,type:"backend") {
    status
    id
    name
    level
    type
  }
}
```

**editSkill**

```
mutation {
  editSkill(id:"4", name:"JavaScript", level:3) {
    status
    message
    name
    id
  }
}
```

**deleteSkill**

```
  deleteSkill(id:"4") {
    status
    message
    name
    id
  }
}
```
