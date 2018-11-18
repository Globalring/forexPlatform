'use strict'

var Benchmark = require('benchmark')
Benchmark.options.minSamples = 200
var suite = new Benchmark.Suite()
var date = require('.')

// We need fixed dates so timing won't flicker just because there's less
// or more string padding to do.
var now1 = new Date(1075817162)   // 2004-02-03 15:06:02
var now2 = new Date(1416696170)   // 2014-11-22 23:42:50

function addFmt (fmt) {
  suite.add(fmt, function () {
    date(fmt, now1)
    date(fmt, now2)
  })
}

addFmt('Y-m-d H:i:s')
addFmt('c')
addFmt('r')
addFmt('S z')

suite.on('cycle', function (event) {
  console.log(String(event.target))
})

suite.run()
