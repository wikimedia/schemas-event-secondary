# Fragment Integration Guide

## Background

The DesktopWebUIActions, MobileWebUIActions, and EditAttemptStep schemas in our system are classified as legacy schemas (eventcapsules) because they were created under the legacy EventLogging system before the (Modern) Event Platform was established. The legacy EventLogging client would place your event in a capsule (the event.event property) before submitting it to the event beacon endpoint.

Please note that these legacy schemas have specific requirements for adding new fragments.

This outlines the process for integrating new fragments into both legacy and non-legacy schemas.

## Non-Legacy Schema Integration
For non-legacy schemas, such as web_ui_scroll, common fragments (i.e. fragment/analytics/web) can be seamlessly integrated by appending them under `allOf:`.

Example:
```yaml
title: analytics/mediawiki/web_ui_scroll
description: >-
  Tracks scroll events by a user
$id: /analytics/mediawiki/web_ui_scroll/2.0.0
$schema: https://json-schema.org/draft-07/schema#
type: object
allOf: #Fragments added as $ref under allOf:
  - $ref: /fragment/analytics/common/2.0.0#
  - $ref: /fragment/analytics/web_identifiers/1.0.0#
  - $ref: /fragment/analytics/web/2.0.0#
```

## Legacy Schema Integration

In contrast, legacy schemas like `EditAttemptStep` require a distinct approach when integrating a common fragment (i.e. `fragment/analytics/web`). Due to the legacy nature of these schemas, common fragments *should not* be appended under `allOf:`. Instead, these fragments are added to the top-level of the schema properties, directly within the `event.properties` section.

**Example:**
```yaml
title: analytics/legacy/editattemptstep
description: >-
  Logs generic events related to editing activity. All events are logged
  client-side, except that init, saveSuccess, and saveFailure events for the
  wikitext editor are logged server-side.
$id: /analytics/legacy/editattemptstep/2.0.1
$schema: 'https://json-schema.org/draft-07/schema#'
type: object
allOf:
  - $ref: /fragment/analytics/legacy/eventcapsule/1.2.0
  - $ref: /fragment/http/client_ip/1.0.0#
  - properties:
      event:
        properties: #Fragment added as $ref under properties.
          $ref: /fragment/analytics/web/2.0.0#/properties
```

## Summary
* For non-legacy schemas, simply append the new fragment under allOf.
* For legacy schemas, integrate the fragment directly within the event.properties.
