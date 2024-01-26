const { ApolloServer } = require('@apollo/server')
// const { get } = require('../data')
const { typeDefs } = require('./schema/typeDefs')
const { resolvers } = require('./schema/resolvers')

// const typeDefs = `
//   type Query {
//     customerBusinesses: CustomerBusinesses
//   }

//   type Business {
//     id: Int
//     sbi: String
//     name: String
//   }

//   type CustomerBusinesses {
//     crn: String
//     businesses: [Business]
//   }
// `

// const resolvers = {
//   Query: {
//     customerBusinesses: async (_root, _args, context) => {
//       const response = await get('/organisation/person/3337243/summary?search=', context.crn, context.token)
//       return {
//         crn: context.crn,
//         businesses: response._data?.map(business => ({
//           id: business.id,
//           sbi: business.sbi,
//           name: business.name
//         })) ?? []
//       }
//     }
//   }
// }

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = { apolloServer }
