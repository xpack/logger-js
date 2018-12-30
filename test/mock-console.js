/*
 * This file is part of the xPack distribution
 *   (http://xpack.github.io).
 * Copyright (c) 2017 Liviu Ionescu.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict'
/* eslint valid-jsdoc: "error" */
/* eslint max-len: [ "error", 80, { "ignoreUrls": true } ] */

// ----------------------------------------------------------------------------

/**
 * Mock console.
 */

// ----------------------------------------------------------------------------

// const assert = require('assert')
const Writable = require('stream').Writable
const Console = require('console').Console

// ============================================================================

class Mock {
  constructor () {
    this.stdout = []
    this.ostream = new Writable({
      write: (chunk, encoding, callback) => {
        this.stdout.push(chunk.toString())
        callback()
      }
    })

    this.stderr = []
    this.errstream = new Writable({
      write: (chunk, encoding, callback) => {
        this.stderr.push(chunk.toString())
        callback()
      }
    })
    this.console = new Console(this.ostream, this.errstream)
  }

  clear () {
    this.stdout = []
    this.stderr = []
  }
}

// ----------------------------------------------------------------------------
// Node.js specific export definitions.

// By default, `module.exports = {}`.
// The class is added as a property of this object.
module.exports.Mock = Mock

// In ES6, it would be:
// export class Mock { ... }
// ...
// import { Mock } from 'mock-console.js'

// ----------------------------------------------------------------------------
