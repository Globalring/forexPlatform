(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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

  function pad (num, size) {
    var s = num + ''
    while (s.length < size) s = '0' + s
    return s
  }

  var short_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var long_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  var iso_8601_numeric_day = ['7', '1', '2', '3', '4', '5', '6']

  var long_months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  var short_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec']

  var tokens = {
    d: function (date) {
      return pad(date.getDate(), 2)
    },
    j: function (date) {
      return String(date.getDate())
    },
    D: function (date) {
      return short_days[date.getDay()]
    },
    l: function (date) {
      return long_days[date.getDay()]
    },
    N: function (date) {
      return iso_8601_numeric_day[date.getDay()]
    },
    S: function (date) {
      if ([1, 21, 31].indexOf(date.getDate()) !== -1) {
        return 'st'
      }
      if ([2, 22].indexOf(date.getDate()) !== -1) {
        return 'nd'
      }
      if ([3, 23].indexOf(date.getDate()) !== -1) {
        return 'rd'
      }
      return 'th'
    },
    w: function (date) {
      return String(date.getDay())
    },
    z: function (date) {
      var start = new Date(date.getFullYear(), 0, 1)
      return Math.floor((date - start) / (1000 * 60 * 60 * 24))
    },
    F: function (date) {
      return long_months[date.getMonth()]
    },
    m: function (date) {
      return pad(date.getMonth() + 1, 2)
    },
    M: function (date) {
      return short_months[date.getMonth()]
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
      if ([0, 2, 4, 6, 7, 9, 11].indexOf(date.getMonth())) {
        return '31'
      }
      return '30'
    },
    Y: function (date) {
      return String(date.getFullYear())
    },
    y: function (date) {
      return String(date.getFullYear()).slice(2)
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
      return pad(this.g(date), 2)
    },
    H: function (date) {
      return pad(this.G(date), 2)
    },
    i: function (date) {
      return pad(date.getMinutes(), 2)
    },
    s: function (date) {
      return pad(date.getSeconds(), 2)
    },
    u: function (date) {
      return pad(date.getMilliseconds(), 3)
    },
    U: function (date) {
      return String(Math.floor(date.getTime() / 1000))
    },
    P: function (date) {
      var offset_minutes = date.getTimezoneOffset()
      var sign = offset_minutes < 0 ? '-' : '+'
      offset_minutes = Math.abs(offset_minutes)
      var hours = Math.floor(offset_minutes / 60)
      var minutes = offset_minutes % 60
      return sign + ([pad(hours, 2), pad(minutes, 2)].join(':'))
    },
    O: function (date) {
      var offset_minutes = date.getTimezoneOffset()
      var sign = offset_minutes < 0 ? '-' : '+'
      offset_minutes = Math.abs(offset_minutes)
      var hours = Math.floor(offset_minutes / 60)
      var minutes = offset_minutes % 60
      return [sign, pad(hours, 2), pad(minutes, 2)].join('')
    },
    c: function (_date) {
      return date('Y-m-d\TH:i:sP', _date)
    },
    r: function (_date) {
      return date('D, j M Y H:i:s O', _date)
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

},{}],3:[function(require,module,exports){
/* global define */
(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    global.modlog = factory()
  }
})(this, function () {
  'use strict'

  var date = require('phpdate')
  var is_node = typeof window === 'undefined'
  var levels = ['error', 'warn', 'info', 'debug', 'silly']
  var color_level

  if (is_node) {
    var chalk = require('chalk')
  }

  var color_map = {
    debug: 'green',
    info: 'blue',
    warn: 'yellow',
    error: 'red'
  }

  if (is_node) {
    color_level = function (level, msg) {
      if (!color_map[level]) {
        return msg
      }
      return chalk[color_map[level]](msg)
    }
  } else {
    color_level = function (level, msg) {
      return msg
    }
  }

  function defaults (obj, source) {
    if (typeof obj === 'undefined') {
      obj = {}
    }
    for (var k in source) {
      if (!obj.hasOwnProperty(k)) {
        obj[k] = source[k]
      }
    }
    return obj
  }

  function do_log () {
    var args = [].slice.call(arguments)
    var _level = args.shift()
    var _module_name = args.shift()

    var preamble = date('[' + this.options.format + ']') + '[' + _module_name + ']'
    if (this.options.colors) {
      preamble = color_level(_level, preamble)
    }
    if (typeof args[0] === 'string') {
      args[0] = preamble + ' ' + args[0]
    } else {
      args.unshift(preamble)
    }
    if (typeof this.options.logger[_level] === 'function') {
      this.options.logger[_level].apply(this.options.logger, args)
    }
  }

  /**
   * get a default thing to log to. this is so we don't mess with the global `console`
   *
   * @return {object}
   */
  function get_default_logger () {
    var _logger = {}
    for (var idx in levels) {
      var _level = levels[idx]
      if (_level === 'silly') {
        _level = 'debug'
      }
      if (is_node && _level === 'debug') {
        // node.js does not actually have console.debug. TIL.
        _level = 'info'
      }
      _logger[_level] = console[_level].bind(console)
    }
    return _logger
  }

  return function modlog_factory (module_name, options) {
    var _log = {}
    _log.options = defaults(options, {
      format: 'H:i:s',
      colors: true
    })
    if (!_log.logger) {
      _log.logger = get_default_logger()
    }
    for (var idx in levels) {
      _log[levels[idx]] = do_log.bind(_log, levels[idx], module_name)
    }
    return _log
  }
})

},{"chalk":1,"phpdate":2}]},{},[3]);
