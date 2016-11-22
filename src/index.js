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
        const setTitle = (page, title) => _p(sheets[page].setTitle)(title)
        const getRows = (page, opts) => {
          return _p(sheets[page].getRows)(opts || {})
          .then(rows => {
            rows.forEach(row => {
              row.promise = {
                save: _p(row.save),
                del: _p(row.del)
              }
            })
            return rows
          })
        }
        const getCells = (page, opts) => {
          return _p(sheets[page].getCells)(opts || {})
          .then(cells => {
            cells.forEach(cell => {
              cell.promise = {
                save: _p(cell.save),
                del: _p(cell.del),
                setValue: (val) => _p(cell.setValue)(val)
              }
            })
            return cells
          })
        }
        const bulkUpdateCells = (page, cells) => _p(sheets[page].bulkUpdateCells)(cells)
        const addRow = (page, opts) => _p(sheets[page].addRow)(opts || {})
        const setHeaderRow = (page, opts) => _p(sheets[page].setHeaderRow)(opts || [])
        const getHeaderRow = (page) =>
          getCells(page, { 'min-row': 1, 'max-row': 1, 'min-col': 1, 'max-col': 26 })
          .then(cells => cells.map(cell => cell.value))
        const resize = (page, opts) => _p(sheets[page].resize)(opts || {})
        const clear = (page) => _p(sheets[page].clear)()
        const del = (page) => _p(sheets[page].del)()

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
        // console.log(funcs)

        const sheetFuncs = (sheetNumber) => ({
          setTitle: funcs.setTitle,
          getInfo: funcs.getInfo,
          getRows: funcs.getRows.bind(sheets, sheetNumber),
          getCells: funcs.getCells.bind(sheets, sheetNumber),
          bulkUpdateCells: funcs.bulkUpdateCells.bind(sheets, sheetNumber),
          addRow: funcs.addRow.bind(sheets, sheetNumber),
          setHeaderRow: funcs.setHeaderRow.bind(sheets, sheetNumber),
          getHeaderRow: funcs.getHeaderRow.bind(sheets, sheetNumber),
          resize: funcs.resize.bind(sheets, sheetNumber),
          clear: funcs.clear.bind(sheets, sheetNumber),
          del: funcs.del.bind(sheets, sheetNumber)
        })

        funcs.sheetNumber = sheetFuncs

        resolve(funcs)
      })
    })
  })
}

module.exports = { init }
