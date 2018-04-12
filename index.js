'use strict'

const _ = require('lodash')
const {upperFirst, camelCase, invert} = _

const valueSml = Symbol('zEnumItemValue')

module.exports = words => {
  const zEnumItem = class {
    constructor (value) {
      this[valueSml] = value
      Object.defineProperty(
        this,
        camelCase(['is', value]),
        {value: true, enumerable: true}
      )
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
      Object.defineProperties(zEnumItem.prototype, {
        [`to${name}`]: {
          get () {
            return dict[this[valueSml]]
          },
          enumerable: true
        },
        ..._(dict)
          .mapKeys((v, key) => camelCase(['is', key]))
          .mapValues(() => ({value: false, enumerable: true}))
          .value()
      })
    }
  }

  return z
}