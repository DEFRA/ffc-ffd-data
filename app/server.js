require('./insights').setup()
const Hapi = require('@hapi/hapi')
const { cacheConfig } = require('./config')

const server = Hapi.server({
  port: process.env.PORT,
  cache: [{
    name: cacheConfig.cacheName,
    provider: {
      constructor: cacheConfig.catbox,
      options: cacheConfig.catboxOptions
    }
  }]
})

const cache = server.cache({ cache: cacheConfig.cacheName, segment: cacheConfig.segment, expiresIn: cacheConfig.ttl })
server.app.cache = cache

const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz')
)

server.route(routes)

module.exports = { server }
