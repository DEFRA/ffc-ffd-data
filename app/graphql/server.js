const { ApolloServer } = require('@apollo/server')
const { typeDefs } = require('./schema/typeDefs')
const { resolvers } = require('./schema/resolvers')

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = { apolloServer }
