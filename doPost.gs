/**
 * IMPORTANT NOTE:
 * YOU CAN ONLY HAVE ONE `doPost` FUNCTION IN A PROJECT.
 * 
 * These two functions cannot be merged into one because 
 * restriction imply sender get nothing in return 
 * while get sender's id return sender's id.
 * If you choose to implement restriction, you have to create another 
 * apps script project to get sender's id.
 * 
 * Sender's id can also be obtained from browser's url when using 
 * Telegram web, i.e., https://web.telegram.org/k/#[sender's id].
 */

/**
 * Get sender's id.
 * Add this id to `list`.
 */
function doPost(e)
{
  const contents = JSON.parse(e.postData.contents);
  const query = contents.message.text
  const sender = contents.message.from.id;

  if (query === '/start') {
    const message = 'Your id is: ' + sender;
    sendMessageTo(sender, message);
  }
}

/**
 * Implement restriction on who can access the bot.
 */
function doPost(e)
{
  const contents = JSON.parse(e.postData.contents);
  const sender = contents.message.from.id;
  const persons = JSON.parse(list).map(person => person.id);

  if (!persons.includes(sender)) {
    const message = 'You are not authorized to access this bot.';
    sendMessageTo(sender, message);
  }
}

function sendMessageTo(sender, message)
{
  const url = 'https://api.telegram.org/bot' + botToken + '/';
  const data = {
    method: 'post',
    payload: {
      method: 'sendMessage',
      chat_id: sender,
      text: message,
      parse_mode: 'HTML'
    }
  };
  UrlFetchApp.fetch(url, data);
}
