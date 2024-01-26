const Wreck = require('@hapi/wreck')
const config = require('../config')
const { getApimToken } = require('./get-apim-token')

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

module.exports = { get }
