BUILD_NEW=npm run build-new

SCHEMA_DIR=jsonschema/analytics/product_metrics
SCHEMA_FRAGMENT_DIR=jsonschema/fragment/analytics/product_metrics

all: interaction_schemas

interaction_schemas: interaction_schema_fragments
	$(BUILD_NEW) $(SCHEMA_DIR)/*/*/current.yaml

interaction_schema_fragments:
	$(BUILD_NEW) $(SCHEMA_FRAGMENT_DIR)/*/current.yaml
