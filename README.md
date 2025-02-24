# Threshold Notification

## Overview
This is Google Apps Script to notify list of users if designated cell(s) in spreadsheet changed into certain values. Notifications are sent via Telegram's bot.

This use case is very useful when you have your staffs work on the spreadsheet and want to immediately notified if some calculations hit certain thresholds.

## Sheets configuration
In this example the script will notify users if cell `C1` hit 10, being `C1 = A1 + B1`.

<div align="center"><img src="https://github.com/user-attachments/assets/ab6ae6be-d11b-464b-aede-06118f394f92" /></div>

## Apps Script configuration

- **`appsscript.json`**:

  ```json
  {
    "webapp": {
      "executeAs": "USER_DEPLOYING",
      "access": "ANYONE_ANONYMOUS"
    },
    "oauthScopes": [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/script.external_request",
      "https://www.googleapis.com/auth/script.scriptapp"
    ]
  }
  ```

- **Apps Script -> Project Settings -> Script Properties:**

  Get `BOT_TOKEN` from Telegram's [@BotFather](https://t.me/BotFather).

  ```text
  {
    LIST: [
      {
        "name": "John Smith",
        "username": "johnsmith"
      },
      {
        "name": "Jane Doe",
        "username": "janedoe"
      }
    ]
    BOT_TOKEN: "..."
  }
  ```

- Add `editTrigger` in **Apps Script -> Triggers**.

- Deploy the script as webapp and copy the webapp's url to be used as [webhook](https://core.telegram.org/bots/api#setwebhook). Just visit this in browser:

  ```text
  https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url=https://script.google.com/macros/s/{Deployment-ID}/exec
  ```

## Get id for user

```mermaid
graph TD
  classDef return fill:#f96
  data["`Connection data:
  id & username`"]
  botStart@{ shape: manual-input, label: "User connect to bot"} --> data
  
  data --> exist{"username exist ?"}
  list@{ shape: cyl, label: "LIST of usernames" } --> exist

  exist --> |No| end1["Send error message"]:::return
  exist --> |Yes| getId["Get id"]

  end2@{ shape: cyl, label: "Update LIST, <br/>add id for the username" }
  getId --> end2:::return  
```

## Edit trigger

```mermaid
graph TD;
  classDef return fill:#f96;
  edit[Edit A1 or B1] --> threshold{C1 = 10 ?};

  threshold -->|No| end1[STOP]:::return;
  threshold -->|Yes| list@{ shape: cyl, label: "LIST of usernames" };

  list --> id{username has id ?};

  id --> |No| end2[STOP]:::return
  end3["`Send notification
  to user`"]
  id --> |Yes| end3:::return
```

## References
- [Telegram API](https://core.telegram.org/api)
