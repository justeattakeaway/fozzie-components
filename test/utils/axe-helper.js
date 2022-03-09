const AxeReports = require('axe-reports');
const { exec } = require('child_process');
const fs = require('fs');
const Page = require('@justeat/f-wdio-utils/src/page.object');
const { getTestConfiguration } = require('../../test/configuration/configuration-helper');
const configuration = getTestConfiguration();

/**
 * Wrapper for our Page.object `getAccessibilityTestResults` method so we
 * can invoke and process the results from the `processResults` call.
 *
 * @param componentName
 */
exports.getAxeResults = (componentName) => {
    const newPageInstance = new Page();
    const results = newPageInstance.getAccessibilityTestResults();

    if (results.violations.length > 0) {
        exports.processResults(results, componentName);
    }

    return results;
};

/**
 * Creates a CSV build artifact of the pages accessibility violations.
 * @param {Object} results - The accessibility violations.
 * @param {String} componentName - Name of the component that was tested.
 */
exports.processResults = (results, componentName) => {
    console.log('Creating .CSV artifact for Axe violations');

    const filePath = `${configuration.testType.violationCSVDirectory}/${componentName}-a11y-violations`;
    // axe-reports can't create the CSV in CI due to permissions so we have to create the file ourselves.
    if (process.env.CIRCLECI) {
        try {
            if (!fs.existsSync(filePath)) {
                exec(`touch ${filePath}`, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

    AxeReports.processResults(results, 'csv', filePath, false);
    console.error(`Expected no accessibility violations. Found: ${results.violations.length}`);
};
