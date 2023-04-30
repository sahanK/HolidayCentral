const ErrorResponse = require('./error');

/**
 * 
 * @param {any} data Data from the CSV file
 * @param {[string]} validateWith Columns names array to validate with
 */
exports.validateCsvData = (data, validateWith) => {
  let rows = [], error;

  const columnNames = data[0];

  let incorrectColumns = false;
  columnNames.forEach((columnName, columnIndex) => {
    if (validateWith[columnIndex] !== columnName) {
      incorrectColumns = true;
    }
  });

  if (incorrectColumns) {
    return {
      rows,
      error: new ErrorResponse('The csv has invalid columns structure', 400),
    }
  }

  if (columnNames.length !== validateWith.length) {
    return {
      rows,
      error: new ErrorResponse('There are missing or extra columns in your file', 400),
    }
  }

  // Remove first row (column names)
  data.shift();

  return {
    rows: data,
    error
  }
};