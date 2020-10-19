const { source } = require('axe-core');
const AxeReports = require('axe-reports');
const { exec } = require('child_process');

/**
 * Runs the WCAG accessibility tests on the curent page of the global browser
 */
exports.getAccessibilityTestResults = (componentName) => {
    browser.execute(source);

    // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md

    const results = browser.executeAsync(done => {
        const options = {
            runOnly: {
                type: 'tag',
                values: ['wcag2a']
            },
            rules: {
                'duplicate-id': { enabled: false }
            }
        };

        axe.run(document, options, (err, results) => {
            if (err) throw err;
            done(results);

            return results;
        });
    });

    if(results.violations.length > 0)
    {
        this.processResults(results, componentName);
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

    const fileName = `${componentName}-a11y-violations`;
    const localFilePath = `${__dirname}../../../axe-violations/${fileName}`;
    // axe-reports can't create the CSV in CI due to permissions so we have to create the file ourselves.
    if (process.env.CIRCLECI) {
        const ciFileName = `/home/circleci/project/axe-violations/${fileName}`;

        try {
            if (!fs.existsSync(ciFileName)) {
                exec(`touch ${ciFileName}`, (error, stdout, stderr) => {
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

        AxeReports.processResults(results, 'csv', ciFilePath, false);
    } else {
        AxeReports.processResults(results, 'csv', localFilePath, false);
    }

    console.error(`Expected no accessibility violations. Found: ${results.violations.length}`);
};
