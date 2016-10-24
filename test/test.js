/* global describe, it, before */

var db = require('../src/index')
require('co-mocha')

const key = '1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w'
const credsPath = '../google-generated-creds.json'

const maxTime = 3000

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

    it('should getHeaderRow', function * () {
      this.timeout(maxTime)
      const headerRow = yield sheets.getHeaderRow(1)
      console.log(`>headerRow: ${headerRow} ${headerRow.length}`)
    })

    it('should getCells', function * () {
      this.timeout(maxTime)
      const cells = yield sheets.getCells(1)
      console.log(`>cells length: ${cells.length}`)
    })

    describe('async data save', () => {
      it('should save a row\'s cell data', function * () {
        this.timeout(maxTime)
        const rows = yield sheets.getRows(1)
        const row = rows[(rows.length / 2 | 0) - 1]
        console.log(row)
        console.log(row.orig.age)
        row.orig.age = 123
        yield row.save()
        console.log('row saved')
      })
      it('should save a cell\'s data', function * () {
        this.timeout(maxTime)
        const cells = yield sheets.getCells(1)
        const cell = cells[cells.length / 2 | 0]

        console.log(cell.value)
        console.log(cell.orig.value)

        // save strategy #1 -> convenience method
        yield cell.setValue(99)
        console.log('cell saved 1')

        // save strategy #2 -> update orig value & save
        cell.orig.value = Math.random()
        yield cell.save()
        console.log('cell saved 2')
      })
    })
  })
})
