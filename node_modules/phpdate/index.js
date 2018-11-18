/* global define */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    global.date = factory()
  }
})(this, function () {
  'use strict'

  var ESCAPE_CHAR = '\\'
  var millisecondsPerDay = 24 * 60 * 60 * 1000

  var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var longDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var iso8601NumericDay = ['7', '1', '2', '3', '4', '5', '6']

  var longMonths = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  var numberSuffix = (function (sufs) {
    return function (date) {
      return (sufs[date.getDate() % 10] || 'th')
    }
  }(['th', 'st', 'nd', 'rd']))

  var tokens = {
    d: function (date) {
      return String(100 + date.getDate()).slice(1)
    },
    j: function (date) {
      return String(date.getDate())
    },
    D: function (date) {
      return shortDays[date.getDay()]
    },
    l: function (date) {
      return longDays[date.getDay()]
    },
    N: function (date) {
      return iso8601NumericDay[date.getDay()]
    },
    S: numberSuffix,        // locale-dependent!
    w: function (date) {
      return String(date.getDay())
    },
    z: function (date) {
      var start = (new Date(date.getFullYear(), 0, 1)).getTime()
      return String(Math.floor((date.getTime() - start) / millisecondsPerDay))
    },
    F: function (date) {
      return longMonths[date.getMonth()]
    },
    m: function (date) {
      return String(date.getMonth() + 101).slice(1)
    },
    M: function (date) {
      return shortMonths[date.getMonth()]
    },
    n: function (date) {
      return String(date.getMonth() + 1)
    },
    L: function (date) {
      var year = date.getFullYear()
      if (((year % 4) === 0 && (year % 100) !== 0) || (year % 400) === 0) {
        return '1'
      }
      return '0'
    },
    t: function (date) {
      if (date.getMonth() === 1) {
        return this.L(date) === '1' ? '29' : '28'
      }
      if ([0, 2, 4, 6, 7, 9, 11].indexOf(date.getMonth()) !== -1) {
        return '31'
      }
      return '30'
    },
    Y: function (date) {
      return String(date.getFullYear())
    },
    y: function (date) {
      return String(date.getFullYear()).substr(2, 2)
      // Using the exact positions will give a little performance boost for
      // the next few thousand years, at the cost of a little maintainance
      // effort in the far future. (Writing this @ 2017-02-24)
    },
    a: function (date) {
      return date.getHours() < 12 ? 'am' : 'pm'
    },
    A: function (date) {
      return this.a(date).toUpperCase()
    },
    g: function (date) {
      return String(date.getHours() % 12 || 12)
    },
    G: function (date) {
      return String(date.getHours())
    },
    h: function (date) {
      var h = this.g(date)
      return (h.length === 2 ? h : '0' + h)
    },
    H: function (date) {
      return String(100 + date.getHours()).slice(1)
    },
    i: function (date) {
      return String(100 + date.getMinutes()).slice(1)
    },
    s: function (date) {
      return String(100 + date.getSeconds()).slice(1)
    },
    u: function (date) {
      return String(1000 + date.getMilliseconds()).slice(1)
    },
    U: function (date) {
      return String(Math.floor(date.getTime() / 1000))
    },
    P: function (date) {
      var offsetMinutes = date.getTimezoneOffset()
      var sign = offsetMinutes < 0 ? '-' : '+'
      offsetMinutes = Math.abs(offsetMinutes)
      var hours = Math.floor(offsetMinutes / 60)
      var minutes = offsetMinutes % 60
      return sign + String(100 + hours).slice(1) + ':' +
        String(100 + minutes).slice(1)
    },
    O: function (date) {
      var offsetMinutes = date.getTimezoneOffset()
      var sign = offsetMinutes < 0 ? '-' : '+'
      offsetMinutes = Math.abs(offsetMinutes)
      var hours = Math.floor(offsetMinutes / 60)
      var minutes = offsetMinutes % 60
      return sign + String(10000 + (100 * hours) + minutes).slice(1)
    },
    c: function (_date) {
      return date('Y-m-dTH:i:sP', _date)
    },
    r: function (_date) {
      return date('D, d M Y H:i:s O', _date)
    }
  }

  function date (format, time) {
    var specimen, idx, char, replacement, head, tail
    if (!time) {
      time = new Date()
    }
    specimen = format.split('')
    for (idx = 0; idx < specimen.length; idx++) {
      if (idx > 0 && specimen[Math.max(0, idx - 1)] === ESCAPE_CHAR) {
        head = specimen.slice(0, idx - 1)
        tail = specimen.slice(idx)
        specimen = head.concat(tail)
        idx -= 1
        continue
      }
      char = specimen[idx]
      if (!tokens[char]) {
        continue
      }
      replacement = tokens[char](time).split('')
      head = specimen.slice(0, idx)
      tail = specimen.slice(idx + 1)
      specimen = head.concat(replacement, tail)
      idx += (replacement.length - 1)
    }
    return specimen.join('')
  }
  return date
})
