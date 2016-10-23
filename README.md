# google-spreadsheet-promise

A light-weight promise wrapper around NPM [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet).

Helpful link on limits of [Google spreadsheets](https://support.google.com/drive/answer/37603?hl=en).

## Usage

```js
const db = require('google-spreadsheet-promise')

// a spreadsheet key is the long id in the sheets URL
const key = '1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w'
// see Auth help/tips below
const credsPath = './google-generated-creds.json'

...

// Note- assumed to be in a generator for "yield":
const sheets = yield db.init(key, credsPath)

const sheetsInfo = yield sheets.getInfo()
const colNames = yield sheets.getColumnNames(1) // sheet 1
const rows = yield sheets.getRows(1) // sheet 1
const cells = yield sheets.getCells(1) // sheet 1
const data = yield sheets.addRow(1, { // sheet 1
   col1Name: Math.random(),
   col2Name: Date.now() / (10 * 1000 * 1000) | 0
})
```

See [test/test.js](./test/test.js) for other examples.

See [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet) for more [options](https://www.npmjs.com/package/google-spreadsheet#spreadsheetworksheet).

Auth [help/tips](https://www.npmjs.com/package/google-spreadsheet#service-account-recommended-method).
