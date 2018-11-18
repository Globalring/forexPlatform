/* global describe, it, beforeEach */
'use strict'

process.env.TZ = 'UTC'

var date = require('../')
var assert = require('assert')

describe('date', function () {
  var testDate
  beforeEach(function () {
    testDate = new Date(2016, 1, 4, 3, 24, 5, 34)
  })
  describe('d', function () {
    it('should properly format date with padded zero', function () {
      assert.equal(date('d', testDate), '04')
    })
  })
  describe('j', function () {
    it('should properly format date without padded zero', function () {
      assert.equal(date('j', testDate), '4')
    })
  })
  describe('D', function () {
    it('should format date to short day name', function () {
      assert.equal(date('D', testDate), 'Thu')
      testDate.setMonth(0, 31)
      assert.equal(date('D', testDate), 'Sun')
      testDate.setMonth(1, 1)
      assert.equal(date('D', testDate), 'Mon')
      testDate.setDate(2)
      assert.equal(date('D', testDate), 'Tue')
      testDate.setDate(3)
      assert.equal(date('D', testDate), 'Wed')
      testDate.setDate(5)
      assert.equal(date('D', testDate), 'Fri')
      testDate.setDate(6)
      assert.equal(date('D', testDate), 'Sat')
    })
  })
  describe('l', function () {
    it('should format date to long day name', function () {
      assert.equal(date('l', testDate), 'Thursday')
      testDate.setMonth(0, 31)
      assert.equal(date('l', testDate), 'Sunday')
      testDate.setMonth(1, 1)
      assert.equal(date('l', testDate), 'Monday')
      testDate.setDate(2)
      assert.equal(date('l', testDate), 'Tuesday')
      testDate.setDate(3)
      assert.equal(date('l', testDate), 'Wednesday')
      testDate.setDate(5)
      assert.equal(date('l', testDate), 'Friday')
      testDate.setDate(6)
      assert.equal(date('l', testDate), 'Saturday')
    })
  })
  describe('N', function () {
    it('should format date to iso-8601 day number (monday = 1, sunday = 7)', function () {
      assert.equal(date('N', testDate), '4')
      testDate.setMonth(0, 31)
      assert.equal(date('N', testDate), '7')
      testDate.setMonth(1, 1)
      assert.equal(date('N', testDate), '1')
      testDate.setDate(2)
      assert.equal(date('N', testDate), '2')
      testDate.setDate(3)
      assert.equal(date('N', testDate), '3')
      testDate.setDate(5)
      assert.equal(date('N', testDate), '5')
      testDate.setDate(6)
      assert.equal(date('N', testDate), '6')
    })
  })
  describe('S', function () {
    it('should properly determine ordinality of the date', function () {
      assert.equal(date('jS', testDate), '4th')
      testDate.setMonth(1, 1)
      assert.equal(date('jS', testDate), '1st')
      testDate.setDate(2)
      assert.equal(date('jS', testDate), '2nd')
      testDate.setDate(3)
      assert.equal(date('jS', testDate), '3rd')
    })
  })
  describe('w', function () {
    it('should properly format the day of the week to just a number', function () {
      assert.equal(date('w', testDate), '4')
      testDate.setMonth(0, 31)
      assert.equal(date('w', testDate), '0')
      testDate.setMonth(1, 6)
      assert.equal(date('w', testDate), '6')
    })
  })
  describe('z', function () {
    it('should return the number of days into the year', function () {
      assert.equal(date('z', testDate), '34')
    })
  })
  describe('F', function () {
    it('should return the long month name of the date', function () {
      testDate.setMonth(0, 31)
      assert.equal(date('F', testDate), 'January')
      testDate.setMonth(1, 1)
      assert.equal(date('F', testDate), 'February')
      testDate.setMonth(2, 1)
      assert.equal(date('F', testDate), 'March')
      testDate.setMonth(3, 1)
      assert.equal(date('F', testDate), 'April')
      testDate.setMonth(4, 1)
      assert.equal(date('F', testDate), 'May')
      testDate.setMonth(5, 1)
      assert.equal(date('F', testDate), 'June')
      testDate.setMonth(6, 1)
      assert.equal(date('F', testDate), 'July')
      testDate.setMonth(7, 1)
      assert.equal(date('F', testDate), 'August')
      testDate.setMonth(8, 1)
      assert.equal(date('F', testDate), 'September')
      testDate.setMonth(9, 1)
      assert.equal(date('F', testDate), 'October')
      testDate.setMonth(10, 1)
      assert.equal(date('F', testDate), 'November')
      testDate.setMonth(11, 1)
      assert.equal(date('F', testDate), 'December')
    })
  })
  describe('m', function () {
    it('should return the month number with a padded zero (non-zero indexed)', function () {
      testDate.setMonth(0, 31)
      assert.equal(date('m', testDate), '01')
      testDate.setMonth(1, 1)
      assert.equal(date('m', testDate), '02')
      testDate.setMonth(2, 1)
      assert.equal(date('m', testDate), '03')
      testDate.setMonth(3, 1)
      assert.equal(date('m', testDate), '04')
      testDate.setMonth(4, 1)
      assert.equal(date('m', testDate), '05')
      testDate.setMonth(5, 1)
      assert.equal(date('m', testDate), '06')
      testDate.setMonth(6, 1)
      assert.equal(date('m', testDate), '07')
      testDate.setMonth(7, 1)
      assert.equal(date('m', testDate), '08')
      testDate.setMonth(8, 1)
      assert.equal(date('m', testDate), '09')
      testDate.setMonth(9, 1)
      assert.equal(date('m', testDate), '10')
      testDate.setMonth(10, 1)
      assert.equal(date('m', testDate), '11')
      testDate.setMonth(11, 1)
      assert.equal(date('m', testDate), '12')
    })
  })
  describe('M', function () {
    it('should return the short month name of the date', function () {
      testDate.setMonth(0, 31)
      assert.equal(date('M', testDate), 'Jan')
      testDate.setMonth(1, 1)
      assert.equal(date('M', testDate), 'Feb')
      testDate.setMonth(2, 1)
      assert.equal(date('M', testDate), 'Mar')
      testDate.setMonth(3, 1)
      assert.equal(date('M', testDate), 'Apr')
      testDate.setMonth(4, 1)
      assert.equal(date('M', testDate), 'May')
      testDate.setMonth(5, 1)
      assert.equal(date('M', testDate), 'Jun')
      testDate.setMonth(6, 1)
      assert.equal(date('M', testDate), 'Jul')
      testDate.setMonth(7, 1)
      assert.equal(date('M', testDate), 'Aug')
      testDate.setMonth(8, 1)
      assert.equal(date('M', testDate), 'Sep')
      testDate.setMonth(9, 1)
      assert.equal(date('M', testDate), 'Oct')
      testDate.setMonth(10, 1)
      assert.equal(date('M', testDate), 'Nov')
      testDate.setMonth(11, 1)
      assert.equal(date('M', testDate), 'Dec')
    })
  })
  describe('n', function () {
    it('should return the month number without a padded zero (non-zero indexed)', function () {
      testDate.setMonth(0, 31)
      assert.equal(date('n', testDate), '1')
      testDate.setMonth(1, 1)
      assert.equal(date('n', testDate), '2')
      testDate.setMonth(2, 1)
      assert.equal(date('n', testDate), '3')
      testDate.setMonth(3, 1)
      assert.equal(date('n', testDate), '4')
      testDate.setMonth(4, 1)
      assert.equal(date('n', testDate), '5')
      testDate.setMonth(5, 1)
      assert.equal(date('n', testDate), '6')
      testDate.setMonth(6, 1)
      assert.equal(date('n', testDate), '7')
      testDate.setMonth(7, 1)
      assert.equal(date('n', testDate), '8')
      testDate.setMonth(8, 1)
      assert.equal(date('n', testDate), '9')
      testDate.setMonth(9, 1)
      assert.equal(date('n', testDate), '10')
      testDate.setMonth(10, 1)
      assert.equal(date('n', testDate), '11')
      testDate.setMonth(11, 1)
      assert.equal(date('n', testDate), '12')
    })
  })
  describe('L', function () {
    it('should return 0 for non-leap-years', function () {
      [2015, 2013, 2011, 2003, 1997, 1998, 1986].forEach(function (y) {
        testDate.setYear(y)
        assert.equal(date('L', testDate), '0')
      })
    })
    it('should return 1 for leap-years', function () {
      [2016, 2012, 2008, 2004, 2000, 1996, 1992, 1988].forEach(function (y) {
        testDate.setYear(y)
        assert.equal(date('L', testDate), '1')
      })
    })
  })
  describe('t', function () {
    it('should return the number of calendar days for the set month', function () {
      assert.equal(date('t', testDate), '29')
      testDate.setYear(2015)
      assert.equal(date('t', testDate), '28')
      testDate.setMonth(0, 4)
      assert.equal(date('t', testDate), '31')
      testDate.setMonth(3, 1)
      assert.equal(date('t', testDate), '30')
    })
  })
  describe('Y', function () {
    it('should return the full year', function () {
      assert.equal(date('Y', testDate), '2016')
      testDate.setYear(2012)
      assert.equal(date('Y', testDate), '2012')
    })
  })
  describe('y', function () {
    it('should return the truncated year (1998 -> 98)', function () {
      assert.equal(date('y', testDate), '16')
      testDate.setYear(2012)
      assert.equal(date('y', testDate), '12')
      testDate.setYear(2000)
      assert.equal(date('y', testDate), '00')
    })
  })
  describe('a', function () {
    it('should return am or pm depending on the hour of day', function () {
      assert.equal(date('a', testDate), 'am')
      testDate.setHours(0)
      assert.equal(date('a', testDate), 'am')
      testDate.setHours(23)
      assert.equal(date('a', testDate), 'pm')
      testDate.setHours(12)
      assert.equal(date('a', testDate), 'pm')
    })
  })
  describe('A', function () {
    it('should return AM or PM depending on the hour of the day', function () {
      assert.equal(date('A', testDate), 'AM')
      testDate.setHours(0)
      assert.equal(date('A', testDate), 'AM')
      testDate.setHours(23)
      assert.equal(date('A', testDate), 'PM')
      testDate.setHours(12)
      assert.equal(date('A', testDate), 'PM')
    })
  })
  describe('g', function () {
    it('should return non-military hour without a leading zero', function () {
      assert.equal(date('g', testDate), '3')
      testDate.setHours(15)
      assert.equal(date('g', testDate), '3')
      testDate.setHours(0)
      assert.equal(date('g', testDate), '12')
      testDate.setHours(12)
      assert.equal(date('g', testDate), '12')
    })
  })
  describe('G', function () {
    it('should return military hour without a leading zero', function () {
      assert.equal(date('G', testDate), '3')
      testDate.setHours(15)
      assert.equal(date('G', testDate), '15')
      testDate.setHours(0)
      assert.equal(date('G', testDate), '0')
      testDate.setHours(12)
      assert.equal(date('G', testDate), '12')
    })
  })
  describe('h', function () {
    it('should return non-military hour with a leading zero', function () {
      assert.equal(date('h', testDate), '03')
      testDate.setHours(15)
      assert.equal(date('h', testDate), '03')
      testDate.setHours(0)
      assert.equal(date('h', testDate), '12')
      testDate.setHours(12)
      assert.equal(date('h', testDate), '12')
    })
  })
  describe('H', function () {
    it('should return military hour with a leading zero', function () {
      assert.equal(date('H', testDate), '03')
      testDate.setHours(15)
      assert.equal(date('H', testDate), '15')
      testDate.setHours(0)
      assert.equal(date('H', testDate), '00')
      testDate.setHours(12)
      assert.equal(date('H', testDate), '12')
    })
  })
  describe('i', function () {
    it('should return the minutes with a leading zero', function () {
      assert.equal(date('i', testDate), '24')
      testDate.setMinutes(3)
      assert.equal(date('i', testDate), '03')
    })
  })
  describe('s', function () {
    it('should return the seconds with a leading zero', function () {
      assert.equal(date('s', testDate), '05')
      testDate.setSeconds(45)
      assert.equal(date('s', testDate), '45')
    })
  })
  describe('u', function () {
    it('should return the milliseconds with a leading zero', function () {
      assert.equal(date('s.u', testDate), '05.034')
    })
  })
  describe('U', function () {
    it('should return the seconds since the unix epoch', function () {
      assert.equal(date('U', testDate), '1454556245')
    })
  })
  describe('P', function () {
    it('should return the timezone offset seperated by a colon', function () {
      assert.equal(date('P', testDate), '+00:00')
    })
  })
  describe('O', function () {
    it('should return the timezone offset not seperated by a colon', function () {
      assert.equal(date('O', testDate), '+0000')
    })
  })
  describe('c', function () {
    it('should return the date formatted in iso 8601 format', function () {
      assert.equal(date('c', testDate), '2016-02-04T03:24:05+00:00')
    })
  })
  describe('r', function () {
    it('should return the date formatted rfc2822 format', function () {
      assert.equal(date('r', testDate), 'Thu, 04 Feb 2016 03:24:05 +0000')
    })
  })
  describe('letter escaping', function () {
    it('should skip over letters that are prefixed with a slash (\\)', function () {
      assert.equal(date('\\rc', testDate), 'r2016-02-04T03:24:05+00:00')
      assert.equal(date('Y-\\m-d H:\\i:s', testDate), '2016-m-04 03:i:05')
    })
  })
})
