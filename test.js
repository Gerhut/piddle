/* eslint-env mocha */

if (global.Promise == null) {
  require('any-promise/register/bluebird')
}

var should = require('should')
var Promise = require('any-promise')

var piddle = require('./')

it('should throw error with non-function middleware', function () {
  (function () { piddle(1) }).should.throw()
})

it('should transfer request & response object into middleware', function (done) {
  var request = {}
  var response = {}
  function middleware (innerRequest, innerResponse) {
    innerRequest.should.exactly(request)
    innerResponse.should.exactly(response)
  }
  var piddled = piddle(middleware)
  piddled(request, response, done)
})

it('should transfer error, request & response object into middleware', function (done) {
  var error = new Error()
  var request = {}
  var response = {}
  function middleware (innerError, innerRequest, innerResponse) {
    innerError.should.exactly(error)
    innerRequest.should.exactly(request)
    innerResponse.should.exactly(response)
  }
  var piddled = piddle(middleware)
  piddled(error, request, response, done)
})

it('should call next when middleware throws error', function (done) {
  function middleware () {
    throw new Error()
  }
  var piddled = piddle(middleware)
  piddled(null, null, function (err) {
    err.should.be.Error()
    done()
  })
})

it('should call next when middleware returns rejection', function (done) {
  function middleware () {
    return Promise.reject(new Error())
  }
  var piddled = piddle(middleware)
  piddled(null, null, function (err) {
    err.should.be.Error()
    done()
  })
})

it('should call next without arguments when middleware generally returns', function (done) {
  function middleware () { }
  var piddled = piddle(middleware)
  piddled(null, null, function (err) {
    should(err).be.undefined()
    done()
  })
})

it('should call next without arguments when middleware returns fulfilled Promise', function (done) {
  function middleware () { return Promise.resolve() }
  var piddled = piddle(middleware)
  piddled(null, null, function (err) {
    should(err).be.undefined()
    done()
  })
})
