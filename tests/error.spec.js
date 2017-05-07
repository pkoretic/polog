'use strict'

const polog = require("../")
const expect = require("chai").expect

describe('error', () => {
  describe('#info', () => {
    it('log should be undefined', () => {
      expect(polog.info).to.be.a('undefined')
    })
  })

  describe('#debug', () => {
    it('debug should be a undefined', () => {
      expect(polog.debug).to.be.a('undefined')
    })
  })

  describe('#warn', () => {
    it('warn should be a undefined', () => {
      expect(polog.warn).to.be.a('undefined')
    })
  })

  describe('#error', () => {
    it('error should be a undefined', () => {
      expect(polog.error).to.be.a('undefined')
    })
  })
})
