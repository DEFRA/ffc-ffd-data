const Wreck = require('@hapi/wreck')
const { apimConfig } = require('../config')
const { getApimToken } = require('./get-apim-token')

const get = async (path, crn, token) => {
  const apimToken = await getApimToken()
  const { payload } = await Wreck.get(`${apimConfig.host}${path}`, {
    headers: {
      crn,
      'X-Forwarded-Authorization': token,
      Authorization: apimToken,
      'Ocp-Apim-Subscription-Key': apimConfig.ocpSubscriptionKey
    },
    json: true
  })
  return payload
}

module.exports = { get }
