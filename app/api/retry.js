const { drop } = require('../cache')
const { APIM_TOKEN } = require('../constants/cache-keys')

const retry = async (fn, retriesLeft = 3, interval = 1000, exponential = true) => {
  try {
    return (await fn())
  } catch (err) {
    if (err.isBoom && err.output.statusCode === 401) {
      await drop(APIM_TOKEN)
    }
    if (retriesLeft > 0) {
      await new Promise(resolve => setTimeout(resolve, interval))
      return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential)
    } else {
      throw err
    }
  }
}

module.exports = retry
