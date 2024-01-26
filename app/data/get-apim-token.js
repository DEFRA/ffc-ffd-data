const Wreck = require('@hapi/wreck')
const FormData = require('form-data')
const { apimConfig } = require('../config')

const getApimToken = async () => {
  const data = new FormData()
  data.append('client_id', apimConfig.clientId)
  data.append('client_secret', apimConfig.clientSecret)
  data.append('scope', apimConfig.scope)
  data.append('grant_type', 'client_credentials')

  const response = await Wreck.post(apimConfig.authorizationUrl, {
    headers: data.getHeaders(),
    payload: data,
    json: true
  })

  return `${response.payload.token_type} ${response.payload.access_token}`
}

module.exports = { getApimToken }
