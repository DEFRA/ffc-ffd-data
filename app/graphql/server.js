const { ApolloServer } = require('@apollo/server')
const typeDefs = `
  type Query {
    customerBusinesses: CustomerBusinesses
  }

  type Business {
    id: Int
    name: String
  }

  type CustomerBusinesses {
    crn: String
    businesses: [Business]
  }
`
const resolvers = {
  Query: {
    customerBusinesses: async () => {
      return {
        crn: '123456789',
        businesses: [{
          id: 1,
          name: 'Business 1'
        }, {
          id: 2,
          name: 'Business 2'
        }]
      }
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = { apolloServer }
