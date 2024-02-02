const fs = require('node:fs/promises')
const { get } = require('../../api')
const filePath = 'app/temp-data/data.txt'

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
      try {
        const farm = { id, animals, quantity }
        const data = JSON.parse(await fs.readFile(filePath))
        data.push(farm)
        await fs.writeFile(filePath, JSON.stringify(data))
        return {
          farm,
          code: 200,
          success: true,
          message: 'successful'
        }
      } catch (err) {
        console.error(err)
        return {
          farm: {},
          code: 400,
          success: false,
          message: err
        }
      }
    }
  }
}

module.exports = { resolvers }
