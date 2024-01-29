const { cacheConfig } = require('../config')

const set = async (request, key, value) => {
  await request.server.app.cache.set(key, value, cacheConfig.ttl)
}

module.exports = set
