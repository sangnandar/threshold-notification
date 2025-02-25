/**
 * Sender's id can also be obtained from browser's url when using 
 * Telegram web, i.e., https://web.telegram.org/k/#[sender's id].
 */

/**
 * Implement restriction on who can access the bot,
 * using Telegram's username.
 * @param {Event} e 
 * @returns {void}
 */
function doPost(e)
{
  const contents = JSON.parse(e.postData.contents);
  const {
    id,
    username
  } = contents.message.from;

  const persons = JSON.parse(LIST);
  const person = persons.find(person => person.username === username);

  if (person) {
    person.id = id;
    scriptProps.setProperty('LIST', JSON.stringify(persons));
  } else {
    const message = 'You are not authorized to access this bot.';
    sendMessageTo(id, message);
  }
}

/**
 * Installable trigger.
 * Edit on A1 or B1 in Sheet1 to trigger notification.
 * @param {Event} e 
 * @returns {void}
 */
function editTrigger(e)
{
  const sheet = e.range.getSheet();
  const sheetName = sheet.getSheetName();

  if (!(
    sheetName === 'Sheet1' &&
    isAnyCellInRange(['A1', 'B1'], e.range)
  )) return;

  const value = Number(
    e.source
      .getSheetByName('Sheet1')
      .getRange('C1')
      .getValue()
  );
  const oldValue = Number(docProps.getProperty('oldValue'));

  const valueToNotify = 10;
  if (value === valueToNotify && value !== oldValue) { // prevent repeated notification, notify only once

    docProps.setProperty('oldValue', String(value));

    // schedule re-check after X hours, if necessary
    const resetAfter = 10; // in hours
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + resetAfter);
    
    const funcName = 'reset';
    const triggerIsExist = ScriptApp.getProjectTriggers()
      .some(trigger => trigger.getHandlerFunction() === funcName);
  
    if (!triggerIsExist) {
      ScriptApp.newTrigger(funcName)
        .timeBased()
        .at(datetime)
        .create();
    }

    // send notifications
    const message = 'My value is now 10.';
    const persons = JSON.parse(LIST);
    const requests = persons
      .filter(person => person.id) // filter out persons without id
      .map(person => {
        return {
          url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          method: 'post',
          contentType: 'application/json',
          muteHttpExceptions: true,
          payload: JSON.stringify({
            chat_id: person.id,
            text: message,
            parse_mode: 'HTML'
          })
        };
      });
    UrlFetchApp.fetchAll(requests); // to all persons in the `LIST`

  }
}
