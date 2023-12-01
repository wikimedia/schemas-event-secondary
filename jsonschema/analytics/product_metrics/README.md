# Ownership of Metrics Platform schemas

The `product_metrics` directory holds schemas that are wholly owned, updated, and maintained by the
[Data Products](https://www.mediawiki.org/wiki/Data_Platform_Engineering/Data_Products) team.

Metrics Platform base schemas are part of an evolving array of common event shapes that are and will be available for use
in custom concrete schemas owned by product/feature teams.

The [Metrics Platform API](https://wikitech.wikimedia.org/wiki/Metrics_Platform/Implementations#API)
provides methods that can be used by clients to submit events via Metrics Platform. Clients can submit events to the
base interaction schemas in this directory without having to create custom schemas.

However if custom data are needed, product teams can reference these available schemas for use in their
own custom concrete schemas (for which they are responsible). See [Metrics Platform/Creating a Custom Schema](https://wikitech.wikimedia.org/wiki/Metrics_Platform/Creating_a_Custom_Schema)
for more details.


