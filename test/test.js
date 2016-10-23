/* global describe, it, before */

var db = require('../src/index')
require('co-mocha')

const key = '1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w'
const credsPath = '../google-generated-creds.json'

const maxTime = 2000

describe.only('# db', () => {
  describe('## sanity', () => {
    let sheets
    before(function * () {
      sheets = yield db.init(key, credsPath)
    })

    it('should getInfo', function * () {
      this.timeout(maxTime)
      const sheetsInfo = yield sheets.getInfo()
      console.log(`>loaded sheet title: ${sheetsInfo.title}`)
      console.log(`>JSON: ${JSON.stringify(sheetsInfo)}`)
    })

    it('should getRows', function * () {
      this.timeout(maxTime)
      const rows = yield sheets.getRows(1)
      console.log(`>rows length: ${rows.length}`)
    })

    it('should getColumnNames', function * () {
      this.timeout(maxTime)
      const colNames = yield sheets.getColumnNames(1)
      console.log(`>colNames: ${colNames} ${colNames.length}`)
    })

    it('should getCells', function * () {
      this.timeout(maxTime)
      const cells = yield sheets.getCells(1)
      console.log(`>cells length: ${cells.length}`)
    })
  })
})
