const express = require('express')
const graphHTTP = require('express-graphql')
const jwt = require('jsonwebtoken')
const cors = require('cors')

// const secret = 'sffds'
// const token = jwt.sign({user:'1'}, secret)
// console.log(token)

const {schema, root} = require('./schema')

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())

app.use(
  '/graphql',
  graphHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})
