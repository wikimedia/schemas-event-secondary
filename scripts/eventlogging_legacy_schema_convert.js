#!/usr/bin/env node

'use strict';

const fetch   = require('node-fetch');
const jsTools = require('@wikimedia/jsonschema-tools');

/**
 * Recurses through schema converting Draft 4 JSONSchema style
 * required to Draft 7.
 * @param  {Object} schema
 * @return {Object}
 */
function convertDraft4RequiredProperties( schema ) {

    if ('properties' in schema) {
        const required = [];

        for (const [propertyName, property] of Object.entries(schema.properties)) {
            if (property.type == 'object') {
                schema.properties[propertyName] = convertDraft4RequiredProperties(property);
            } else if ('required' in property) {
                if (property['required'] === true) {
                    required.push(propertyName);
                }
                delete schema.properties[propertyName]['required'];
            }
        }

        if (required.length > 0) {
            schema.required = schema.required || [];
            schema.required = schema.required.concat(required);
        }
    }
    return schema;
}

/**
 * Gets URL from which to request the EventLogging metawiki event schema.
 */
function eventLoggingSchemaNameToMetaUrl(schemaName) {
    return `https://meta.wikimedia.org/w/api.php?action=jsonschema&format=json&formatversion=2&title=${schemaName}`;
}

/**
 * Converts an EventLogging legacy metawiki SchemaName to a schema title.
 */
function eventLoggingSchemaNameToTitle(schemaName) {
    return `analytics/legacy/${schemaName.toLowerCase()}`;
}

function eventLoggingSchemaNameToFileUri(schemaName, filename) {
    return '/' + eventLoggingSchemaNameToTitle(schemaName) + `/${filename}`;
}


/**
 * Gets the EventLogging legacy event schema from metawiki.
 */
async function getEventLoggingSchema(schemaName) {
    const schemaUrl = eventLoggingSchemaNameToMetaUrl(schemaName);
    const response = await fetch(schemaUrl);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error(response.statusText + "\n" + await response.text());
    }
}

const capsuleSchemaUri = '/fragment/analytics/legacy/eventcapsule/1.2.0';
const legacySchemaTemplate = {
  "$schema": "https://json-schema.org/draft-07/schema#",
  "type": "object",
  "allOf": [
    {
      "$ref": capsuleSchemaUri
    },
  ],
  "examples": []
}

const exampleTemplate = {
    "event": {
        "key1": "ENTER VALID EXAMPLES HERE!"
    },
    "meta": {
        "dt":"2020-04-02T19:11:20.942Z",
        "id":"b0caf18d-6c7f-4403-947d-2712bbe28610",
    },
    "dt":"2020-04-02T19:11:20.942Z",
    "client_dt": "2020-04-02T19:11:20.942Z"
}


/**
 * Converts a metawiki legacy EventLogging schema to an Event Platform formatted schema.
 * The examples will need to be manually filled in.
 */
async function convertEventLoggingSchema(schemaName) {
    const eventSubSchema = await getEventLoggingSchema(schemaName);

    const newSchema = Object.assign({}, legacySchemaTemplate);
    newSchema.description = eventSubSchema.description;
    newSchema.title = eventLoggingSchemaNameToTitle(schemaName);
    newSchema.$id = eventLoggingSchemaNameToFileUri(schemaName, '1.0.0');

    eventSubSchema.type = 'object';
    delete eventSubSchema.title;
    delete eventSubSchema.description;

    const eventSubProperties = convertDraft4RequiredProperties({
        required: ['event'],
        properties: {
            event: eventSubSchema
        }
    });

    newSchema.allOf.push(eventSubProperties)


    const example = Object.assign({}, exampleTemplate);
    example.$schema = { $ref: '#/$id' };
    example.meta.stream = `eventlogging_${schemaName}`;
    // Not required in eventcapsule, but is still used to lookup
    // schema of events on metawiki during the migration.
    example.schema = schemaName;

    newSchema.examples.push(example);
    return newSchema;
}


const scriptName = process.argv[1].substr(process.argv[1].lastIndexOf('/') + 1);
const usage = `${scriptName} <SchemaName>`;

async function main(args) {
    if (args.length <= 0 || args[0] == 'help' || args[0].includes('--')) {
        console.error(`Must provide SchemaName\n${usage}\n`);
        process.exit(1);
    }
    const schemaName = args[0];

    try {
        const s = await convertEventLoggingSchema(schemaName);
        console.log(jsTools.serialize(s, 'yaml'));
    } catch(err) {
        console.error(err);
        process.exit(1);
    }
}

main(process.argv.slice(2));