The `content_translation_event` schema is designed to model all the
user-facing aspects of the [Content Translation
tool](https://www.mediawiki.org/wiki/Content_translation), including:
-   invitations and entry points
-   the dashboard and translation suggestions
-   the mobile and desktop editors
-   the publication process
-   the different flows for article and section translations

# Glossary
Some terms have particular meanings in the context of Content Translation
and this schema:
-   _segment_: a discrete piece of content that has to be separately added
    to the translation by the user. This varies by platform: on desktop,
    the standard segment (called a _section_ in the code) is a paragraph
    or something similar like a heading, image, or infobox. On mobile,
    the standard segment is a sentence.
-   _invite_, _invitation_: a temporary message (rather than a fixed element
    of the interface) which encourages the user to use Content
    Translation
-   _MT_: "machine translation"
-   _SX_: section translation
-   _AX_: article translation

# Event types, subtypes, and sources
While most of the fields record the state of the environment at event
time, the `event_type`, `event_subtype`, and `event_source` fields indicate
what actually happened. Since they have a ton of possible values, this
section provides a fuller explanation of their meaning and valid
combinations.

The following diagram illustrates the expected flows between events
types. The source file (`event_flows.graphml`) is available in this
folder and can be edited with the diagramming app
[yEd](https://www.yworks.com/products/yed).

![](https://phab.wmfusercontent.org/file/data/dix6qzrnlsw4m5uqz5ei/PHID-FILE-rzfzwqmi2vu7guycykge/ContentTranslationEvent-flows-v5.png)
[View full version](https://phab.wmfusercontent.org/file/data/dix6qzrnlsw4m5uqz5ei/PHID-FILE-rzfzwqmi2vu7guycykge/ContentTranslationEvent-flows-v5.png)

Each of the following sections defines one particular `event_type` and gives the values of `event_subtype` and `event_source` it can be combined with, if any.

## `invite_show`
Occurs when the system shows the user an invitation to use Content Translation. It's currently implemented only for the invitation to translate another section from the same article when the user views a section translation they have just published (subtype `invite_translate_another_section`).

## `dashboard_open`
Occurs whenever the user navigates to the main Content Translation dashboard.

Possible sources:
- `content_language_selector`: the language links shown when a user searches for a language where the article is not available and where mobile translation is supported as an invitation to translate. Note: On desktop, this is a source for the editor_open event as it opens the editor directly without an intermediate stop on the dashboard.
- `contributions_menu`: the link in the dropdown menu shown when the user hovers over the “contributions” link in the top-right corner of the logged-in interface.
- `contributions_page`: the link shown above the user’s list of contributions on Special:Contributions
- `direct`: when the user follows a generic link to the dashboard or enters its URL manually
- `direct_preselect`: same as direct, except that the link/URL specified a particular translation. This means the translation confirmation dialog will automatically open with that translation preselected after the dashboard is opened.
- `editor_close`: closing the Content Translation editor, which returns the user to the dashboard.
- `frequent_languages`: An indicator in the "Suggested Languages" section of the language selector that surfaces frequently-accessed missing languages as an opportunity to translate them.
- `invite_new_article_creation`: the invitation shown when the user opens the editor on a non-existent page (e.g. after following a red link). This is shown only once per user per wiki.
- `invite_translate_another_section`: the invitation shown when the user views a section translation they have just published. If the user accepts the invitation, they are taken straight to the “select a section” step for the same article, making this source similar to direct_preselect.
- `notification_deletion`: an email or web notification advising the user that an unpublished translation of theirs will soon be deleted. The link will take them to the dashboard only if the article has since been deleted.
- `notification_milestone`: the web notification shown when the user has reached a memorable number of translation
- `notification_new_recommendations`: a one-time notification for new Content Translation users who have recently published a translation, stating that the system has new recommendations for them (since having a seed article improves the quality of the recommendations).
- `recent_edit`: An invitation shown when the user is on a page that they have edited in another language recently in their 10 latest significant edits (+500 bytes or more) for a section missing in the current language.
- `recent_translation`: A notice on recently translated articles that invites users to review and expand with the translation of a new section.
- `language_selector_options`: ...
- `followup_after_publishing`: ...

## `dashboard_search`
Occurs when the user begins entering text in the search box which allows them to start a non-suggested new translation. Can re-occurs only after the user’s focus has left the search box.

## `dashboard_discard_suggestion`
Occurs when the user manually discards a suggested translation.

## `dashboard_refresh_suggestions`
Occurs when the user requests that the list of suggestions be regenerated.

## `dashboard_translation_start`
Occurs when the user starts a new translation, after picking the appropriate article and, in section translation, section and confirming their choice.

Possible sources:
- `continue_published`: the user chooses to continue a translation that they previously published (article translation only)
- `direct_preselect`: the user input a URL or followed a link which specified the translation
- `for_later`:  the user chooses a translation which they had previously saved for later
- `invite_translate_another_section`
- `suggestion_featured`: the user chooses a translation suggested because it is a featured article in the source language
- `suggestion_nearby`: the user chose a translation suggested because the topic is near their location
- `suggestion_no_seed`: the user chooses a translation suggested by the API in the absence of a seed article
- `suggestion_recent_edit`: the user chooses a translation suggested because it is related to one of their recent edits or translation
- `suggestion_topic_area`: the user chooses a translation suggested because its topic is within an area the user has requested
- `search_result`: the user chooses a translation that appeared in the results of a search

## `dashboard_translation_continue`
Occurs when the user selects an in-progress, unpublished translation to continue.

Currently, this only applies to article translations, as in-progress section translations cannot be saved.

## `dashboard_translation_discard`
Occurs when the user permanently discards an in-progress, unpublished translation. If there is a confirmation step, the event should be generated only when the user confirms.

Currently, this only applies to article translations, as in-progress section translations cannot be saved.

## `editor_open`
Possible sources:
- `content_language_selector`: the greyed-out language link shown in the desktop sidebar as an invitation to translate. Unlike most invitations, this opens the editor directly without an intermediate stop on the dashboard.
- `dashboard_translation_continue`: the user came to the editor by continuing an existing translation from the dashboard.
- `dashboard_translation_start`: the user came to the editor by starting a new translation from the dashboard.
- `direct`: the user input a URL or followed a link which took them directly into the editor, in a way not otherwise specified. Note that this only works if the link refers to a translation which the user already has in progress.
- `notification_deletion`: a web or email notification advising the user that an unpublished translation of theirs will soon be deleted. The link will take them to the editor only if the translation has not yet been deleted.

## `editor_segment_add`
Occurs when the user adds a segment of content to the translated version in the editor.

In the desktop editor, this occurs when the user clicks a blank space in the translation column, meaning it happens before the segment can be edited and the added content is always a machine translation (or blank, or source).

In the mobile editor, this occurs when the user adds a segment of unedited machine translation by selecting “apply translation” or selecting the sideways arrow button in the editing interface without making changes (if the user does makes changes, we act as if this event is “absorbed” by `editor_segment_edit`). If the user returns to edit an already-translated segment but makes no changes, the event does not occur.

## `editor_segment_edit`
Occurs when the user completes a series of changes to the translation of a segment.

In the desktop editor, this occurs when the user’s focus leaves a segment after making changes.

In the mobile editor, this occurs when the user selects the sideways arrow button to leave the editing interface, as long as the user has made at least one change.

## `editor_segment_skip`
Occurs when the user explicitly chooses to skip a segment of content from the source rather than to add it to the translation.

This only applies to the mobile editor, since the desktop editor does not push the user to move through the segments in order and therefore has no option to _explicitly_ skip a segment.

## `editor_close_warn`
Occurs when a user attempt to close the window containing the editor is blocked by a warning that they will lose unsaved changes by doing so.

## `editor_close`
Occurs when the user actually leaves the editor to return to return to the dashboard. Other types of editor closures (e.g. closing the window entirely) could be tracked with this event, but currently are not because of the technical difficulty.

If the user attempts to navigate back to the dashboard with unsaved changes, `editor_close_warn` will occur when the warning dialog is shown. If the user chooses to proceed anyway, `editor_close` will then occur.

##  `editor_error`
Occurs when the system notifies the user of an error (in general, this is something that indicates that the user will be unable to publish the translation they have selected).

Possible subtypes:
* `error_not_extended_confirmed_on_enwiki`: the user has selected English Wikipedia as the target wiki, but is not extended confirmed on that wiki. This means that they will be blocked by an abuse filter if they attempt to publish a translation to article space. This error does not prohibit the user from working on the translation.
* `error_translation_in_progress_elsewhere`: the system blocked the user from starting the translation because another Content Translation user has a translation of the same source article in progress. This error does prevent the user from working on the translation.

## `editor_warning_` events
There are three different `event_types` which track the lifecycle of warnings displayed in the editor:
- `editor_warning_dismiss`: occurs when the system displays a particular warning to the user for the first time. Does not occur when a previously-generated warning is redisplayed (for example, when an in-progress translation with warnings is reopened). Does not occur when a previously-generated warning is displayed in a new form (for example, when a collapsed warning is expanded).
- `editor_warning_generate`: occurs when the system removes a warning because the user’s actions have resolved the problem (for example, the user has edited a segment enough that it no longer contains too much unmodified machine translation).
- `editor_warning_withdraw`: occurs when the user manually dismisses a warning or marks it as resolved. Does not occur when the system resolves a warning on its own because it no longer applies.

Note that there can be many particular warnings of the same type (for example, there might be a separate warning of too much unmodified machine translation for each segment in a translation). Each particular warning should produce separate events for its generation and potential withdrawal or dismissal.

These three types have four subtypes indicating the type of warning:
- `warning_major_change_to_source`: an editor changed the source text significantly enough that the system could not apply the changes to the in-progress translation. As a result, the user may be translating an outdated version of the text.
- `warning_template_not_found`: a template in the source text could not be mapped to a template on the target wiki
- `warning_template_parameters_not_mapped`: a template in the source text was successfully mapped to a template on the target wiki, but some of its parameters could not be mapped to corresponding parameters in the target template
- `warning_too_much_unmodified_MT`: a segment contains too much unmodified machine translation

## `publish_attempt`
Occurs when the user makes the final submission of the translation for publication. Does not occur when the user merely advances from the editing interface to the publication interface (for example, by selecting “done” in the mobile editor).

The subtype `publish_attempt_with_warnings` is applied if there are unresolved warnings when the event occurs (including warnings manually dismissed by the user).

## `publish_failure`
Occurs when the user’s publication attempt fails due to a system error or limit.

Possible subtypes:
- `publish_failure_due_to_abuse_filter`: an abuse filter defined by the community of the target wiki blocked the text from being published.
- `publish_failure_due_to_MT_limit`: the ContentTranslation system refused to publish the text because it contained too much unmodified machine translation.
- `publish_failure_due_to_warnings`: the ContentTranslation system refused to publish the text because of unresolved warnings. This is a soft failure: if the user attempts to publish a second time, that attempt will succeed.


## `publish_success`
Possible subtypes:
- `publish_as_addition`: the user publishes the translated content as an addition to the already-existing target (SX only)
- `publish_as_new`: the user publishes the translated content to a target which did not previously exist
- `publish_overwrite`: the user publishes the translated content as a replacement for the already-existing target
- `publish_overwrite_own`: the user publishes the translated content as a replacement for the already-existing target, which was their own prior work
- `publish_to_draft_space`: the user publishes the translated content to a page in the target wiki’s draft space (AX only)
- `publish_to_user_space`: the user publishes the translated content to a page in their user space

# Other notes
-   There are specific events that indicate the user has left the editor
    to return to the dashboard (`editor_close`) and that the user has
    attempted to close the window but been blocked by a warning that
    they have unsaved changes (`editor_close_warn`). However, there
    is no general event that indicates the user has navigated away from
    ContentTranslation entirely (by closing the window or using the back
    button, for example), because this event would be technically
    difficult to capture and wouldn’t be much more informative than an
    “unannounced” end to the user’s stream of events.
-   Some preexisting values of the `campaign` URL query parameter
    duplicate information given by the `event_source` field. For
    example, the entry point on Special:Contributions uses a link with
    `?campaign=contributions-page` and leads to a `dashboard_open`
    event with source `contributions_page`. Such query parameters
    should be removed so we produce cleaner data.
