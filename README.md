# Piddle

[![Build Status](https://travis-ci.org/Gerhut/piddle.svg?branch=master)](https://travis-ci.org/Gerhut/piddle)
[![Coverage Status](https://coveralls.io/repos/github/Gerhut/piddle/badge.svg?branch=master)](https://coveralls.io/github/Gerhut/piddle?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![dependencies Status](https://david-dm.org/Gerhut/piddle/status.svg)](https://david-dm.org/Gerhut/piddle)
[![devDependencies Status](https://david-dm.org/Gerhut/piddle/dev-status.svg)](https://david-dm.org/Gerhut/piddle?type=dev)

Promisify connect middlewares.

## Install

    $ npm install --save piddle
    
## Usage

```javascript
var fs = require('mz/fs')
var connect = require('connect')
var piddle = require('piddle')

var app = connect()

app.use(piddle(function (req, res) {
  return fs.readFile('foo.txt').then(function (data) {
    res.end(data)
  })
}))

app.use(piddle(function (err, req, res) {
  if (err.code === 'ENOENT') {
    res.statusCode = 404
    res.end()
  } else {
    throw err
  }
}))
```

Piddle uses [`any-promise`](https://www.npmjs.com/package/any-promise) to
decide which Promise will be used, to change the Promise used, feel free to
register yours.

## License

MIT License

Copyright (c) 2016 George Chung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
