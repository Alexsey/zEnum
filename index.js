'use strict'

const {upperFirst, findKey, invert} = require('lodash')

const valueSml = Symbol('zEnumItemValue')

module.exports = words => {
  const zEnumItem = class {
    constructor (value) {
      this[valueSml] = value
    }
    toString () {
      return this[valueSml]
    }
  }

  const z = {
    addDict(name, dict) {
      name = upperFirst(name)
      const invertDict = invert(dict)

      z[`from${name}`] = value => new zEnumItem(invertDict[value])
      Object.defineProperty(zEnumItem.prototype, `to${name}`, {
        getter () {
          return dict[this[valueSml]]
        },
        enumerable: true
      })
    }
  }

  return z
}