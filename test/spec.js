(function () {
  'use strict';

  var should = require('should');
  var CappedArray = require('../lib/cappedArray');

  describe('CappedArray', function () {
    var cArr;

    beforeEach(function () {
      cArr = new CappedArray(5);
    });

    describe('.unshift()', function () {
      it('should add the new element at the beginning', function () {
        cArr.unshift('test');
        cArr[0].should.equal('test');
      });
    });

    describe('.push()', function () {
      it('should add the new element at the end', function () {
        cArr.push('test');
        cArr[0].should.equal('test');
      });
    });

    describe('if length < size', function () {
      beforeEach(function () {
        cArr.push('bla');
        cArr.length.should.be.below(cArr.size);
      });

      describe('.unshift()', function () {
        it('should not delete the old values', function () {
          cArr.unshift('test');
          cArr.should.have.length(2);
          cArr[1].should.equal('bla');
        });
      });

      describe('.push()', function () {
        it('should not delete the old values', function () {
          cArr.push('test');
          cArr.should.have.length(2);
          cArr[0].should.equal('bla');
        });
      });
    });

    describe('if length === size', function () {
      beforeEach(function () {
        cArr.push('bla');
        cArr.push('bla2');
        cArr.push('bla3');
        cArr.push('bla4');
        cArr.push('bla5');
        cArr.length.should.equal(cArr.size);
      });

      describe('.unshift()', function () {
        it('should keep the length at the cap size', function () {
          cArr.unshift('test');
          cArr.should.have.length(cArr.size);
        });

        it('should delete the last element at the other end', function () {
          cArr[cArr.length - 1].should.equal('bla5');
          cArr.unshift('test');
          cArr[cArr.length - 1].should.equal('bla4');
        });
      });

      describe('.push()', function () {
        it('should keep the length at the cap size', function () {
          cArr.push('test');
          cArr.should.have.length(cArr.size);
        });

        it('should delete the last element at the other end', function () {
          cArr[0].should.equal('bla');
          cArr.push('test');
          cArr[0].should.equal('bla2');
        });
      });
    });

    describe('.toArray()', function () {
      it('should return a real Array', function () {
        require('util').isArray(cArr.toArray()).should.equal(true);
      });

      it('should be a copy of the CappedArray', function () {
        var arr1, arr2;
        cArr.push('foo');
        cArr.push('bar');
        arr1 = cArr.toArray();

        cArr.push('blah');
        arr2 = cArr.toArray();

        arr1.toString().should.equal('foo,bar');
        arr2.toString().should.equal('foo,bar,blah');
      });
    });
  });

}());
