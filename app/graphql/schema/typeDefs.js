const typeDefs = `#graphql
type Query {
  customerBusinesses: CustomerBusinesses
}

type Business {
  id: Int
  sbi: String
  name: String
}

type CustomerBusinesses {
  crn: String
  businesses: [Business]
}

type Mutation {
  addBusiness(id:Int!, sbi:String!, name: String!): AddBusinessResponse
}

type AddBusinessResponse {
  "Similar to HTTP status code, represents the status of the mutation"
  code: Int!
  "Indicates whether the mutation was successful"
  success: Boolean!
  "Human-readable message for the UI"
  message: String!
  "Newly updated farm after a successful mutation"
  business: Business
}

type Farm {
  id: Int
  animals: String
  quantity: String
}

type Mutation {
  addFarm(id:Int!, animals:String!, quantity: Int!): AddFarmResponse
}

type AddFarmResponse {
  "Similar to HTTP status code, represents the status of the mutation"
  code: Int!
  "Indicates whether the mutation was successful"
  success: Boolean!
  "Human-readable message for the UI"
  message: String!
  "Newly updated business after a successful mutation"
  farm: Farm
}
`

module.exports = { typeDefs }
