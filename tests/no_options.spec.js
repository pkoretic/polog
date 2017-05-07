'use strict'

const polog = require("../")
const expect = require("chai").expect

describe('default', () => {
  describe('#polog', () => {
    it('logger object', () => {
      expect(polog).to.be.a('function')
    })
  })
})
