The `android_article_link_preview_interaction` schema is designed to capture all the actions taken by the user on the article link preview screen

## Property `action`
 Possible values:
 - `linkclick`: the user clicked on a link, and a link preview was shown
 - `navigate`: the user navigated to an article via a link (either by following through a link preview, or following a link elsewhere in the app).
 - `cancel`: the link preview was dismissed without navigating to the target article.
 - `disabled`: The user has disabled link previews in Settings. This means that the user clicked a link, and a preview *should* have been shown, but wasn't because link previews are disabled.