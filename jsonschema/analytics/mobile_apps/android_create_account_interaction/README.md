The `android_create_account_interaction` schema is designed to capture all the actions taken by the user on the create account screen

## Property `action`
 Possible values:
- `start`: User started the process of creating the account by landing on the screen
- `success`: User successfully created an account on the app
- `error`: User could not successfully create an account due to any error
- `captchaShown`: User was shown the captcha as part of account creation
- `captchaFailure`: User did not see the captcha since there was an error while fetching or displaying it

## Property `source`
   Possible values:
- `edit`: User ended up at the create account screen from editing screen
- `blocked`: User ended up at the create account screen from ip block message screen
- `navigation`: User ended up at the create account screen from app navigation menu
- `onboarding`: User ended up at the create account screen from app on-boarding screen
- `suggestededits`: User ended up at the create account screen from suggested edits screen
- `reading_lists_manual_sync`: User ended up at the create account screen from reading list sync dialog
- `settings`: User ended up at the create account screen from settings screen
- `logout_background`: User ended up at the create account screen from logout screen
- `system`: User ended up at the create account screen from system authenticator
