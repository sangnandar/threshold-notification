/**
 * Reset threshold check after X hours.
 * @returns {void}
 */
function reset()
{
  docProps.deleteProperty('oldValue');

  const trigger = ScriptApp.getProjectTriggers()
    .find(trigger => trigger.getHandlerFunction() === 'reset');

  if (trigger) ScriptApp.deleteTrigger(trigger);

}
