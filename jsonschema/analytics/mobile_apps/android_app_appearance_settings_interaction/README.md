The `android_app_appearance_settings_interaction` schema is designed to capture all the actions taken by the user on the article screen.
This schema was migrated from legacy MobileWikiAppAppearanceSettings


## Property `current_value` and `new_value`

Font Sizes are tracked as relative integer values that are offsets from 0 
(i.e. negative values are smaller sizes, and positive values are larger sizes),
and appropriate values for 'theme' are 'light' and 'dark'. Font theme values are 'sans-serif' and 'serif', 'sans-serif' is the default