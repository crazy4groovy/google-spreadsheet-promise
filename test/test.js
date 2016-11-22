/* global describe, it, before */

var db = require('../src/index')
require('co-mocha')

const key = '1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w'
const credsPath = '../google-generated-creds.json'

const maxTime = 4000

describe('# db', () => {
  describe('## sanity simple funcs', () => {
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
        console.log(`row.age: ${row.age}`)
        row.age = +row.age + 1
        yield row.promise.save()
        console.log('row saved')
      })

      it('should save a cell\'s data', function * () {
        this.timeout(maxTime)
        const cells = yield sheets.getCells(1)
        const cell = cells[(cells.length / 2 | 0)]

        console.log(`cell.value: ${cell.value}`)

        // save strategy #1 -> convenience method
        yield cell.promise.setValue(+cell.value + 1)
        console.log('cell saved 1')

        // save strategy #2 -> update orig value & save
        cell.value = Math.random()
        yield cell.promise.save()
        console.log('cell saved 2')
      })

      it('should bulk update cells\' data', function * () {
        this.timeout(maxTime)
        const cells = yield sheets.getCells(1)
        const cell1 = cells[cells.length / 2 | 0]
        const cell2 = cells[(cells.length / 2 | 0) + 1]

        console.log(`cell1.value: ${cell1.value}`)
        console.log(`cell2.value: ${cell2.value}`)

        cell1.value = +cell1.value + 1
        cell2.value = +cell2.value + 1

        yield sheets.bulkUpdateCells(1, [cell1, cell2])
      })
    })
  })

  describe('## sanity sheetNumber funcs', () => {
    let sheetOne
    before(function * () {
      sheetOne = (yield db.init(key, credsPath)).sheetNumber(1)
    })

    it('should getInfo', function * () {
      this.timeout(maxTime)
      const sheetOneInfo = yield sheetOne.getInfo()
      console.log(`>loaded sheet title: ${sheetOneInfo.title}`)
      console.log(`>JSON: ${JSON.stringify(sheetOneInfo)}`)
    })

    it('should getRows', function * () {
      this.timeout(maxTime)
      const rows = yield sheetOne.getRows()
      console.log(`>rows length: ${rows.length}`)
    })

    it('should getHeaderRow', function * () {
      this.timeout(maxTime)
      const headerRow = yield sheetOne.getHeaderRow()
      console.log(`>headerRow: ${headerRow} ${headerRow.length}`)
    })

    it('should getCells', function * () {
      this.timeout(maxTime)
      const cells = yield sheetOne.getCells()
      console.log(`>cells length: ${cells.length}`)
    })
  })
})
