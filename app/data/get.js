const Wreck = require('@hapi/wreck')
const FormData = require('form-data')
const config = require('../config')

const get = async (path, crn, token) => {
  const apimToken = await getApimToken()
  const { payload } = await Wreck.get(`${config.apimHost}${path}`, {
    headers: {
      crn,
      'X-Forwarded-Authorization': token,
      Authorization: apimToken,
      'Ocp-Apim-Subscription-Key': config.apimOcpSubscriptionKey
    },
    json: true
  })
  return payload
}

const getApimToken = async () => {
  const data = new FormData()
  data.append('client_id', config.apimClientId)
  data.append('client_secret', config.apimClientSecret)
  data.append('scope', config.apimScope)
  data.append('grant_type', 'client_credentials')

  const response = await Wreck.post(config.apimAuthorizationUrl, {
    headers: data.getHeaders(),
    payload: data,
    json: true
  })

  return `${response.payload.token_type} ${response.payload.access_token}`
}

module.exports = { get }
