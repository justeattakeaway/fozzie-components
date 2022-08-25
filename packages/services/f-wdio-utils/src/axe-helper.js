const AxeBuilder = require('@axe-core/webdriverio').default;
const fs = require('fs');
const AxeReports = require('axe-reports');
const { exec } = require('child_process');

class AxeHelper {
    /**
     * Creates a CSV build artifact of the pages accessibility violations.
     * @param {Object} results - The accessibility violations.
     * @param {String} componentName - Name of the component that was tested.
     */
    processResults (results, componentName) {
        console.log('Creating .CSV artifact for Axe violations');

        const filePath = `../../../../test/results/axe-violations/${componentName}-a11y-violations`;

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
    }

    /**
     * Runs accessibility test results against a set of rules defined.
     *
     * @returns {ThenArg<ReturnType<BrowserCommandsType["executeAsync"]>>}
     */
    async getAccessibilityTestResults () {
        const builder = new AxeBuilder({ client: browser })
                        .withTags(['wcag21a', 'wcag21aa', 'wcag143', 'cat.color', 'cat.aria'])
                        .disableRules(['duplicate-id', 'html-has-lang', 'aria-allowed-role', 'color-contrast-enhanced']);
        try {
            const results = await builder.analyze();

            return results;
        } catch (e) {
            throw new Error('Unable to get accessibility test results.');
        }
    }
}

export default new AxeHelper();
