# NEW
Steps for new project:
1. Chrome: create new apps script, because clasp create always create in root folder => copy scriptId
2. clasp pull 
3. do work
4. clasp push
5. create new repo in github

Author: [Sunandar Gusti](https://www.upwork.com/freelancers/~0108c8beb80b1a04b5)
<br>Client: [Client Name]

# Overview
This is Google Apps Script to notify list of users if designated cell(s) in spreadsheet changed into certain values. The script will notify the users via Telegram. 

This use case is very useful when you have your staffs work on the spreadsheet and want to immediately notified if some calculations hit certain thresholds.

# Sheets configuration
In this example the script will notify users if cell C1 is 10, being C1 = A1 + B1.

# Apps Script dependencies
None.

# Apps Script configuration
Store these variables into Script Properties, **Apps Script -> Project Settings -> Script Properties**
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

# References
[Telegram API](https://core.telegram.org/api)