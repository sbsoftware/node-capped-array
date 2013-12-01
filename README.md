node-capped-array
=================

Simple Array modification to have a fixed-length array that automatically drops the last entry when pushing over the size.

CappedArrays inherit the prototype methods of Array and override the push and unshift methods, so in principle you can
use them as usual arrays.
Unfortunately I couldn't manage to make util.isArray() return true for CappedArrays. I guess that's the reason why
console.log won't display them like normal arrays, but like objects. That's what the toArray() method is for,
which returns a real array containing the same entries as the CappedArray.

Installation
------------

`npm install capped-array`

Usage
-----

    var CappedArray = require('capped-array');
    var cArr = new CappedArray(5);

    console.log(cArr.toArray()); // []

    cArr.push('test');
    console.log(cArr.toArray()); // ['test']

    cArr.forEach(function (el) {
      console.log(el);
    }); // test
