const GoogleSpreadsheet = require('google-spreadsheet')
const _p = require('es6-promisify')

// INIT ///////////////////////////////////////////////////////////////
function init (key, credsPath) {
  return new Promise((resolve, reject) => {
    // With auth -- read + write
    const creds = require(credsPath)

    // spreadsheet key is the long id in the sheets URL
    // https://docs.google.com/spreadsheets/d/1fyGsYhinmTRNpJyw_uVDpI3wYmWz9FXIYgR2DuobZ_w/editv
    const my_sheet = new GoogleSpreadsheet(key)

    my_sheet.useServiceAccountAuth(creds, (err) => {
      // console.log('[authed db]')

      if (err) {
        console.log(err)
        reject('spreadsheet cred error!')
      }

      const getInfo = _p(my_sheet.getInfo)

      getInfo()
      .then(info => info.worksheets)
      .then(sheets => {
        // console.log('[setting db functions]')
        const getRows = (page, opts) => _p(sheets[page].getRows)(opts || {})
        const getCells = (page, opts) => _p(sheets[page].getCells)(opts || {})
        const addRow = (page, opts) => _p(sheets[page].addRow)(opts || {})
        const getColumnNames = (page) =>
          getCells(page, { 'min-row': 1, 'max-row': 1, 'min-col': 1, 'max-col': 26 })
          .then(cells => cells.map(cell => cell.value))

        const funcs = {
          getInfo,
          getRows,
          getCells,
          addRow,
          getColumnNames
        }
        // console.log(funcs)

        resolve(funcs)
      })
    })
  })
}

module.exports = { init }
