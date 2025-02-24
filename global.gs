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
