# 'Secondary' event JSONSchemas for Wikimedia & Mediawiki event data

This schema repository should contain event schemas that do *not* directly affect user-facing features. These schemas are meant to represent 'tier 2' events. This repository complements the [schemas/event/primary](https://gerrit.wikimedia.org/g/schemas/event/primary/) repository.

Schemas that are used for analytics and 'instrumentation' purposes only should go in the `analytics` directory namespace.

They can be retrieved via the web API at [schema.wikimedia.org](https://schema.wikimedia.org/#!//secondary), for example:

```
curl https://schema.wikimedia.org/repositories/secondary/jsonschema/fragment/analytics/common/latest.json
```

## Legacy EventLogging schemas

The `analytics/legacy` directory is for legacy EventLogging schemas that have been migrated from [meta.wikimedia.org's Schema namespace](https://meta.wikimedia.org/w/index.php?title=Special%3AAllPages&from=&to=&namespace=470). After the associated instrument(s) are updated to use the migrated schema, all updates to the schema must be made in this repository, *not* on the legacy Schema page on Meta wiki.

**NOTE**: `analytics/legacy` schemas are excluded from schema robustness tests.

## See also

- [Event Platform/Schemas](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas)
- [Event Platform/Schemas/Guidelines](https://wikitech.wikimedia.org/wiki/Event_Platform/Schemas/Guidelines)
- [Event Platform/Instrumentation How To](https://wikitech.wikimedia.org/wiki/Event_Platform/Instrumentation_How_To)
- [Event Platform/Analytics/Fragments](https://wikitech.wikimedia.org/wiki/Event_Platform/Analytics/Fragments)

---------

**NOTE**: The only reason for having separate event schema repositories is to allow for different repository merge rights.  Changes to primary schemas need to be more restricted than changes to secondary schemas.
