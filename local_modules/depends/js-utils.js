/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports.merge = merge
module.exports.unpipe = unpipe
module.exports._merge = _merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge (dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName (name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip descriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}

function unpipe(stream) {
  if (typeof stream.unpipe === 'function') {
    // new-style
    stream.unpipe()
    return
  }
  let listeners = (stream.listeners('close') || [])
  let filtered = listeners.filter(listener => {
     return ! (['cleanup','onclose'].includes(listener.name))
  })

  filtered.forEach((listener) => listener.call(stream))
}
function _merge(a,b) {
    let merged = Object.assign(a, b)
    return merged
}