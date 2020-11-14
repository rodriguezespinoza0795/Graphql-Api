require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express') // importar express
const cors = require('cors')
const { graphqlHTTP }  = require('express-graphql') // importar middleware express


const app = express() // crear API express
const PORT = process.env.DB_PORT || 3000 // puesto para trabajar
const isDev = process.env.NODE_ENV !== 'production';

const { readFileSync } = require('fs')
const { join } = require('path')

// Definiendo schema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
  )

  // Configurar resolvers
const resolvers = require('./lib/resolvers')

const schema = makeExecutableSchema ({typeDefs,resolvers})

app.use(cors())

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev
  }))
  
  app.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}/api`)
  })