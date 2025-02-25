/**
 * GLOBAL VARIABLES AND HELPER FUNCTIONS
 */

const scriptProps = PropertiesService.getScriptProperties();
const docProps = PropertiesService.getDocumentProperties();
const {
  LIST,
  BOT_TOKEN
} = scriptProps.getProperties();

/**
 * Send telegram message to a specific user.
 * @param {number} id 
 * @param {string} message 
 * @returns {void}
 */
function sendMessageTo(id, message)
{
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const options = {
    method: 'post',
    contentType: 'application/json',
    muteHttpExceptions: true,
    payload: JSON.stringify({
      chat_id: id,
      text: message,
      parse_mode: 'HTML'
    })
  };
  UrlFetchApp.fetch(url, options);
}

/**
 * To work with edit trigger.
 * @param {string[]} cells in A1Notation.
 * @param {Range} range object.
 * @returns {boolean}
 */
function isAnyCellInRange(cells, range)
{
  return cells.some(cellA1Notation => {
    const cell = range.getSheet().getRange(cellA1Notation);
    const cellRow = cell.getRow();
    const cellCol = cell.getColumn();
  
    const rangeRowStart = range.getRow();
    const rangeColStart = range.getColumn();
    const rangeRowEnd = rangeRowStart + range.getNumRows() - 1;
    const rangeColEnd = rangeColStart + range.getNumColumns() - 1;
  
    return (
      cellRow >= rangeRowStart && cellRow <= rangeRowEnd &&
      cellCol >= rangeColStart && cellCol <= rangeColEnd
    );
  });
}
