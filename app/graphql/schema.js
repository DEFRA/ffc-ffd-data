const typeDefs = `#graphql
type Query {
  customerBusinesses: CustomerBusinesses
}

type Business {
  id: ID!
  sbi: String!
  name: String!
}

type CustomerBusinesses {
  crn: String!
  business: [Business!]!
}
`

// on line 7, ID is one of the scalar types in GraphQL, maybe this would be more appropriate?
// if the query doesn't work via Postman, might be worth changing this back to Int
// exclamation points are added at the end to make the values not null

module.exports = { typeDefs }
