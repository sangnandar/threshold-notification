function reset(){ docProps.setProperty('oldValue', 0); }

function onChange(e)
{
  const sheet = e.source.getSheetByName('Sheet1');
  const value = sheet.getRange('C1').getValue();
  const oldValue = docProps.getProperty('oldValue') || 0 ;

  const valueToNotify = 10;
  if (value === valueToNotify && oldValue !== valueToNotify) { // prevent repeated notification, notify only once

    docProps.setProperty('oldValue', value);

    // schedule re-check after X hours
    const resetAfter = 10; // in hours
    const datetime = new Date();
    datetime.setHours(datetime.getHours() + resetAfter);
    ScriptApp.newTrigger('reset').timeBased().at(datetime).create();

    // send notifications
    const message = 'My value is now 10.';
    const url = 'https://api.telegram.org/bot' + botToken + '/';
    const persons = JSON.parse(list);
    const requests = persons.map(person => {
      return {
        url: url,
        method: 'post',
        payload: {
          method: 'sendMessage',
          chat_id: person.id,
          text: message,
          parse_mode: 'HTML'
        }
      };
    });
    UrlFetchApp.fetchAll(requests); // to all persons in the `list`

  }
}
