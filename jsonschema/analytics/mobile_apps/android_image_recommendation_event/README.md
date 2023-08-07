The `android_image_recommendation_event` schema is designed to capture all the actions taken by the user on the image recommendation feature screens

## Property `action_data`
 Possible name-value pairs. Property will have one or more of these values represented as a comma separated string:
- `filename`: The name of the suggested image
- `recommendation_source`: One of 'wikidata', 'wikipedia', 'commons'
- `recommendation_source_project`: wiki ID ‘en’, ‘de’, etc.
- `rejection_reasons`: The rejection reason, if any, will be a string of comma separated numbers with implied values of '0 - Image is not relevant', '1 - Not enough information to decide', '2 - Image is offensive', '3 - Image is low quality', '4 - I don't know this subject' and '5 - Other'
- `acceptance_state`: The acceptance state of the suggestion. One of 'accepted', 'rejected' or 'undecided'
- `series_number`: Which suggestion in the series the user is on
- `total_suggestions`: The number of suggestion in the series
- `time_spent`: Time spent by the user on the feature in milliseconds (numeric value)