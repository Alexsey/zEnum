'use strict'

const should = require('chai').should()

const zEnum = require('./index')

describe('to/from', () => {
  it('should work for single dictionary', () => {
    const eNum = zEnum(['a', 'b', 'c'])
    const dictXyz = {a: 'x', b: 'y', c: 'z'}
    eNum.addDict('xyz', dictXyz)
    should.exist(eNum.fromXyz)
    const a = eNum.fromXyz('x')
    a.toString().should.eql('a')
    should.exist(a.toXyz)
    a.toXyz.should.eql('x')
  })

  it('should work with two dictionaries', () => {
    const eNum = zEnum(['a', 'b', 'c'])
    const dictXyz = {a: 'x', b: 'y', c: 'z'}
    const dictNum = {a: 1, b: 2, c: 3}
    eNum.addDict('xyz', dictXyz)
    eNum.addDict('num', dictNum)
    should.exist(eNum.fromXyz)
    should.exist(eNum.fromNum)
    const a = eNum.fromXyz('x')
    const b = eNum.fromNum(2)
    a.toString().should.eql('a')
    b.toString().should.eql('b')
    should.exist(a.toXyz)
    should.exist(a.toNum)
    should.exist(b.toNum)
    should.exist(b.toXyz)
    a.toXyz.should.eql('x')
    a.toNum.should.eql(1)
    b.toNum.should.eql(2)
    b.toXyz.should.eql('y')
  })
})

describe('is', () => {
  it('should work basic functionality', () => {
    const eNum = zEnum(['a', 'b', 'c'])
    const dictXyz = {a: 'x', b: 'y', c: 'z'}
    eNum.addDict('xyz', dictXyz)
    const a = eNum.fromXyz('x')
    should.exist(a.isA)
    a.isA.should.eql(true)
    should.exist(a.isB)
    a.isB.should.eql(false)
    should.not.exist(a.isD)
    should.not.exist(a.isX)
  })
})