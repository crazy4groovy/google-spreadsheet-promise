# google-spreadsheet-promise

A light-weight promise wrapper around NPM [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet).

Helpful link on limits of [Google spreadsheets](https://support.google.com/drive/answer/37603?hl=en).

## Usage

```js
const gsp = require('google-spreadsheet-promise')

// a spreadsheet key is the long id in the sheets URL
const key = '1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w'
// see Auth help/tips below
const credsPath = './google-generated-creds.json'

...

// Note- assumed to be in a generator for "yield":
const sheets = yield gsp.init(key, credsPath)
const sheetNumber = 1 // 1-based indexing of sheets

const sheetsInfo = yield sheets.getInfo()
const headerRow = yield sheets.getHeaderRow(sheetNumber)
const rows = yield sheets.getRows(sheetNumber)
const cells = yield sheets.getCells(sheetNumber)
const data = yield sheets.addRow(sheetNumber, {
   col1Name: Math.random(),
   col2Name: Date.now() / (10 * 1000 * 1000) | 0
})
yield sheets.del(sheetNumber)
```

## Full list of promisified functions

```js
const funcs = {
  setTitle,
  getInfo,
  getRows,
  getCells,
  bulkUpdateCells,
  addRow,
  setHeaderRow,
  getHeaderRow,
  resize,
  clear,
  del
}
```

## Notes

See [test/test.js](./test/test.js) for other examples.

See [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) for more [options](https://www.npmjs.com/package/google-spreadsheet#spreadsheetworksheet).

Auth [help/tips](https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method).
