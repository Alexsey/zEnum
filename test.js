'use strict'

const should = require('chai').should()

const zEnum = require('./index')

describe('flow', () => {
    it('should ', () => {
        const eNum = zEnum(['a', 'b', 'c'])
        const dictXyz = {a: 'x', b: 'y', c: 'z'}
        eNum.addDict('xyz', dictXyz)
        const a = eNum.fromXyz('x')
        a.toString().should.eql('a')
        a.toXyz.should.eql('x')
    })

    it('should ', () => {
        const eNum = zEnum(['a', 'b', 'c'])
        const dictXyz = {a: 'x', b: 'y', c: 'z'}
        const dictNum = {a: 1, b: 2, c: 3}
        eNum.addDict('xyz', dictXyz)
        eNum.addDict('num', dictNum)
        const a = eNum.fromXyz('x')
        const b = eNum.fromNum(2)
        a.toString().should.eql('a')
        b.toString().should.eql('b')
        a.toXyz.should.eql('x')
        a.toNum.should.eql(1)
        b.toNum.should.eql(2)
        b.toXyz.should.eql('y')
    })
})