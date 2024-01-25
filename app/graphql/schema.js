export const typeDefs = ` #graphql
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
