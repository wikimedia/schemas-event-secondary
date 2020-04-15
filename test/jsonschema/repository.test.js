'use strict';

const _ = require('lodash');
const jsonschemaTools = require('@wikimedia/jsonschema-tools');
const schemaRepositoryTests = jsonschemaTools.tests;

/*
 * analytics/legacy schemas don't conform to schema robustness
 * rules, so we can't just run all the tests on all schemas.
 * We could globally configure the ignoreSchemas option to
 * match analytics/legacy, but then those schemas wouldn't be
 * findable by jsonschema-tools at all for things like
 * materialilzation.  We just want to skip the robustness
 * tests.
 *
 * Run all tests exported by jsonschemaTools.tests,
 * but pass custom options to the robustness test
 * to have only it ignore the analytics/legacy/schemas.
 */
const robustnessTestIgnoreSchemas = [
    '(/fragment/)?/analytics/legacy/.*',
];

// 'all' is a helper function to run all tests, but we want to run
// each one ourselves passing in custom options.  Delete it
// so we can iterate over all the other specific tests.
delete schemaRepositoryTests.all;

const options = jsonschemaTools.readConfig({logLevel: 'warn'});

for (const test in schemaRepositoryTests) {
    const testOptions = _.cloneDeep(options);

    // Pass custom options to ignore certain schemas to the robusteness tests.
    if (test === 'robustness') {
        testOptions.ignoreSchemas = testOptions.ignoreSchemas.concat(
            robustnessTestIgnoreSchemas
        );
        options.log.warn(
            {ignoreSchemas: testOptions.ignoreSchemas},
            `Excluding schemas from robustness tests`
        );
    }

    // Run this test.
    schemaRepositoryTests[test](testOptions);
}
