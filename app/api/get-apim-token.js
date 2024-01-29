const Wreck = require('@hapi/wreck')
const FormData = require('form-data')
const { apimConfig } = require('../config')
const { get, set } = require('../cache')
const { APIM_TOKEN } = require('../constants/cache-keys')

const getApimToken = async () => {
  const cachedToken = await get(APIM_TOKEN)

  if (cachedToken) {
    console.log('Using cached APIM token')
    return cachedToken
  }

  console.log('Getting new APIM token')

  const response = await getApimTokenFromApim()
  const token = `${response.payload.token_type} ${response.payload.access_token}`
  await set(APIM_TOKEN, token)

  return token
}

const getApimTokenFromApim = async () => {
  const data = new FormData()
  data.append('client_id', apimConfig.clientId)
  data.append('client_secret', apimConfig.clientSecret)
  data.append('scope', apimConfig.scope)
  data.append('grant_type', 'client_credentials')

  return Wreck.post(apimConfig.authorizationUrl, {
    headers: data.getHeaders(),
    payload: data,
    json: true
  })
}

module.exports = { getApimToken }
