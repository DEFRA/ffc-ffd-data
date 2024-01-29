const hapiApollo = require('@as-integrations/hapi').default
const { server } = require('./server.js')
const { apolloServer } = require('./graphql/server.js')

const init = async () => {
  await apolloServer.start()

  await server.register({
    plugin: hapiApollo,
    options: {
      apolloServer,
      path: '/graphql',
      context: ({ request }) => {
        const token = request.headers.authorization
        const crn = request.headers.crn
        return { token, crn }
      }
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
