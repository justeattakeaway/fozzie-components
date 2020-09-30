const { source } = require('axe-core');
const AxeReports = require('axe-reports');

exports.getAccessibilityTestResults =  () => {
    browser.execute(source);

    // https://github.com/dequelabs/axe-core/blob/develop/doc/API.md

    return browser.executeAsync(done => {
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
        });
    });
};

exports.processResults = (results, componentName) => {    
    AxeReports.processResults(results, 'csv',  __dirname + `../../../axe-violations/${componentName}-a11y-violations`);
    console.error(`Expected no accessibility violations. Found: ${results.violations.length}`);
}