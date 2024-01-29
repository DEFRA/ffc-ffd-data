const get = async (request, key) => {
  return request.server.app.cache.get(key)
}

module.exports = get
