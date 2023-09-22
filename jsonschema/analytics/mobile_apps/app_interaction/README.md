The `app_interaction` schema is designed to capture any generic actions taken by the user on the app screens

## Property `action_data`
Possible values. Property will have one or more of these values represented as a comma separated string:
- `add_transaction`: Boolean indicating if the user added donation to cover transaction fee
- `email_subscribe`: Boolean indicating if the user accepts wikimedia email subscription
- `email`: donor email for recurring donation tracking
- `donation_amount`: Integer value of the amount of donation
- `recurring`: Boolean indicating if the user opted in for a recurring subscription
- `pay_method`: Method of payment chosen by user. One of 'applepay', 'credit', 'paypal', 'gpay', 'amazon'
- `campaign_id`: Fr tech provided id of a campaign that is being measured