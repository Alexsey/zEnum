'use strict'

const _ = require('lodash')
const {upperFirst, camelCase, invert} = _

const valueSml = Symbol('zEnumItemValue')

module.exports = words => {
  // todo add ...words support
  const zEnumItem = class {
    constructor (value) {
      this[valueSml] = value
      Object.defineProperty(
        this,
        camelCase(['is', value]),
        {value: true, enumerable: true}
      )
      Object.freeze(this)
    }
    toString () {
      return this[valueSml]
    }
  }

  const z = {
    addDict(name, dict) {
      // todo add validation against words
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
        // todo add isOneOf
      })
    }
  }

  return z
}