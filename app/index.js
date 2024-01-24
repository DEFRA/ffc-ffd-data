const hapiApollo = require('@as-integrations/hapi').default
const { server } = require('./server.js')
const { apolloServer } = require('./graphql/server.js')

const init = async () => {
  await apolloServer.start()

  await server.register({
    plugin: hapiApollo,
    options: {
      apolloServer,
      path: '/graphql'
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
