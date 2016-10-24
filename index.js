var Promise = require('any-promise')

module.exports = function (middleware) {
  if (typeof middleware !== 'function') {
    throw new TypeError('Middleware should be a function')
  }
  if (middleware.length < 3) {
    return function (request, response, next) {
      new Promise(function (resolve) {
        resolve(middleware(request, response))
      }).catch(next)
    }
  } else {
    return function (error, request, response, next) {
      new Promise(function (resolve) {
        resolve(middleware(error, request, response))
      }).catch(next)
    }
  }
}
