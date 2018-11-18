## phpdate [![Build Status](https://travis-ci.org/nkcmr/phpdate.svg?branch=master)](https://travis-ci.org/nkcmr/phpdate) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[date](https://secure.php.net/manual/en/function.date.php) ported to javascript. 

#### why

php's date function is pretty nice for formatting dates. since a lot of php developers use it, it would be nice if it can be used in javascript as well!

#### install

```
npm install --save phpdate
```

#### usage

```javascript
'use strict'
var date = require('phpdate')

console.log(date('Y-m-d H:i:s')) // => 2016-02-27 17:23:50
```

#### api

their are a few differences from php's implementation.

#### date(format[, date])

`format` is the output format of the date. `date` can be an instance of javascript's `Date` object. this differs from php, because php's date function takes an integer to specify the time to format.