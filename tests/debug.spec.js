'use strict'

const polog = require("../")({ debug: true })
const expect = require("chai").expect

describe('debug', () => {
  describe('#info', () => {
    it('log should be a function', () => {
      expect(polog.info).to.be.a('function')
    })
  })

  describe('#debug', () => {
    it('debug should be a function', () => {
      expect(polog.debug).to.be.a('function')
    })
  })

  describe('#warn', () => {
    it('warn should be a function', () => {
      expect(polog.warn).to.be.a('function')
    })
  })

  describe('#error', () => {
    it('error should be a function', () => {
      expect(polog.error).to.be.a('function')
    })
  })
})
