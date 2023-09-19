The `android_image_recommendation_event` schema is designed to capture all the actions taken by the user on the image recommendation feature screens

## Property `action_data`
 Possible name-value pairs. Property will have one or more of these values represented as a comma separated string:
- `filename`: The name of the suggested image
- `recommendation_source`: One of 'wikidata', 'wikipedia', 'commons'
- `recommendation_source_project`: Projects for which the image is recommended
- `rejection_reasons`: The rejection reason, if any, will be comma separated string of the following values - 'notrelevant', 'noinfo', 'offensive', 'lowquality', 'unfamiliar' and 'other'
- `acceptance_state`: The acceptance state of the suggestion. One of 'accepted', 'rejected' or 'undecided'
- `time_spent`: Time spent by the user on the feature in milliseconds (numeric value)
- `revision_id`: Revision id of a successful image recommendation edit