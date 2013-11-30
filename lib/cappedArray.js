(function () {
  'use strict';

  var util = require('util');

  function CappedArray(size) {
    Object.defineProperty(this, 'size', {
      value: size
    });
  }

  util.inherits(CappedArray, Array);

  CappedArray.prototype.unshift = function (el) {
    this.constructor.super_.prototype.unshift.call(this, el);
    if (this.length > this.size) {
      this.constructor.super_.prototype.pop.call(this);
    }
  };

  CappedArray.prototype.push = function (el) {
    this.constructor.super_.prototype.push.call(this, el);
    if (this.length > this.size) {
      this.constructor.super_.prototype.shift.call(this);
    }
  };

  CappedArray.prototype.toArray = function () {
    var arr = [];
    this.forEach(function (el) {
      arr.push(el);
    });
    return arr;
  };

  module.exports = CappedArray;

}());
