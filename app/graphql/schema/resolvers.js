const fs = require('node:fs/promises')
const { get } = require('../../api')
const tempData = require('../../temp-data/data.txt')

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
      const filepath = 'app/temp-data/data.txt'
      const farm = { id, animals, quantity }
      // tempData.push(farm)
      console.log(tempData)
      await fs.appendFile(filepath, 'content')
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
