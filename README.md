# [deprecated] google-spreadsheet-promise

A light-weight promise wrapper around NPM [google-spreadsheet v2](https://www.npmjs.com/package/google-spreadsheet/v/2.0.9) / Google sheets v3 API.

> Note: please use [google-spreadsheet v3](https://www.npmjs.com/package/google-spreadsheet) now; it is promise enabled and leverages the latest Google sheets v4 API.

Helpful link on limits of [Google spreadsheets](https://support.google.com/drive/answer/37603?hl=en).

## Usage

```javascript
const gsp = require('google-spreadsheet-promise')

// a spreadsheet key is the long id in the sheets URL
const key = '1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w'
// see Auth help/tips below
const credsPath = './google-generated-creds.json'

. . .

// Note- assumed to be in a generator for "yield":
const sheets = yield gsp.init(key, credsPath)


// Syntax #1: any-sheet syntax:
const sheetsInfo = yield sheets.getInfo()
const headerRow = yield sheets.getHeaderRow(1) // 1-based indexing of sheets
const rows = yield sheets.getRows(1)
const cells = yield sheets.getCells(1)
const data = yield sheets.addRow(1, {
   col1Name: Math.random(),
   col2Name: Date.now()
})
yield sheets.del(sheetNumber)


// Syntax #2: single-sheet syntax:
const sheetOne = sheets.sheetNumber(1) // 1-based indexing of sheets

const sheetOneInfo = yield sheetOne.getInfo()
const headerRow = yield sheetOne.getHeaderRow()
const rows = yield sheetOne.getRows()
const cells = yield sheetOne.getCells()
const data = yield sheetOne.addRow({
   col1Name: Math.random(),
   col2Name: Date.now()
})
yield sheetOne.del()
```

## Full list of promisified functions

<pre>
const funcs = {
  setTitle,
  getInfo,
  getRows, *
  getCells, *
  bulkUpdateCells,
  addRow,
  setHeaderRow,
  getHeaderRow,
  resize,
  clear,
  del
}
</pre>

\* _Note: Returned `row`s and `cell`s have a `.promise` property added to them, where `.save()`, `.del()`, etc are found. This helps maintain API compatibilities, including `bulkUpdateCells()`._

## Notes

See [test/test.js](./test/test.js) for other examples.

See [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) for more [options](https://www.npmjs.com/package/google-spreadsheet#spreadsheetworksheet).

Auth [help/tips](https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method).
