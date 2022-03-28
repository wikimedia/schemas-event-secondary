The `android_edit_history_interaction` schema is designed to capture all the
actions taken by a user on the edit history screen in the android app


## Property `action`
Possible vales:
- `show_history`: Edit history screen is shown to the user. This happens when the user has tapped 'View edit history' while reading an article, which took them to the edit history screen
- `revision_view`: User tapped a revision on the edit history screen or history compare screen, to view more details about the individual revision
- `compare1`: User tapped 'Compare' on the edit History screen to start selecting the revisions to compare
- `compare2`: User has selected a second revision and tapped the 'Compare' button, navigating them to the comparison screen.
- `thank_try`: User tapped the 'Thank' icon on revision detail screen
- `thank_success`:  User's thanks was successfully sent to the editor who made the revision
- `thank_fail`:  User received an error after trying to thank the editor.