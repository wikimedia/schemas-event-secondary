'Secondary' event JSONSchemas for Wikimedia & Mediawiki event data.

This schema repository should contain event schemas that do *not* directly affect
user-facing features.  These schemas are meant to represent 'tier 2' events.
This repository complements the [schemas/event/primary](https://gerrit.wikimedia.org/r/plugins/gitiles/schemas/event/primary/+/master) repository.

Schemas that are used for analytics and 'instrumentation' purposes
only should go in the `analytics` directory namespace.
`analytics/legacy` is for legacy EventLogging schemas that have been
migrated from [meta.wikimedia.org's Schema namespace](https://meta.wikimedia.org/w/index.php?title=Special%3AAllPages&from=&to=&namespace=470).
`analytics/legacy` schemas are excluded from schema robustness tests.

See also:
- [Event Platform/Schemas](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas)
- [Event Platform/Schemas/Guidelines](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas/Guidelines)


NOTE: The only reason for having separate event schema repositories is to
allow for different repository merge rights.  Changes to primary schemas need
to be more restricted than changes to secondary schemas.
