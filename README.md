# Threshold Notification

# Overview
This is Google Apps Script to notify list of users if designated cell(s) in spreadsheet changed into certain values. Notifications are sent via Telegram's bot.

This use case is very useful when you have your staffs work on the spreadsheet and want to immediately notified if some calculations hit certain thresholds.

# Sheets configuration
In this example the script will notify users if cell `C1` hit 10, being `C1 = A1 + B1`.

<div align="center"><img src="https://github.com/user-attachments/assets/ab6ae6be-d11b-464b-aede-06118f394f92" /></div>

# Apps Script configuration
- Add `Change` trigger, **Apps Script -> Triggers**.

- Store these variables into Script Properties, **Apps Script -> Project Settings -> Script Properties**.
```
list = [
	{
		"name": "John Smith",
		"id": "123456789"
	},
	{
		"name": "Jane Doe",
		"id": "987654321"
	}
]
botToken = '...'
```
Get `botToken` from Telegram's [@BotFather](https://t.me/BotFather).

- If you implement `doPost` deploy the script as webapp and copy the webapp's url to be used as [webhook](https://core.telegram.org/bots/api#setwebhook).

# Apps Script dependencies
None.

# References
[Telegram API](https://core.telegram.org/api)
