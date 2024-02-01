const { get } = require('../../api')
const fs = require('node:fs/promises')

const resolvers = {
  Query: {
    customerBusinesses: async (_root, _args, context) => {
      const response = await get('/organisation/person/3337243/summary?search=', context.crn, context.token)
      return {
        crn: context.crn,
        businesses: response._data?.map(business => ({
          id: business.id,
          sbi: business.sbi,
          name: business.name
        })) ?? []
      }
    }
  },
  Mutation: {
    addBusiness: (_, { id, sbi, name }, contextValue) => {
      // some business logic here
      return {
        business: { id, sbi, name },
        code: 200,
        success: true,
        message: 'successful'
      }
    },
    addFarm: async (_, { id, animals, quantity }, contextValue) => {
      const filePath = 'app/temp-data/data.txt'
      const farm = { id, animals, quantity }
      const farmString = JSON.stringify(farm)
      await fs.appendFile(filePath, farmString + '\n')
      return {
        farm,
        code: 200,
        success: true,
        message: 'successful'
      }
    }
  }
}

module.exports = { resolvers }
