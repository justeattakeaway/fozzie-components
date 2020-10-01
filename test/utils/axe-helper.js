const { source } = require('axe-core');
const AxeReports = require('axe-reports');
const { exec } = require("child_process");

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
    console.log('Creating .CSV artifact for Axe violations')
    

    const filePath = `axe-violations/${componentName}-a11y-violations`;
    // axe-reports can't create the CSV in CI due to permissions so we have to create the file ourselves.
    if(process.env.CIRCLECI)
    {
        console.log(`current directory is: ${process.cwd()}`);
        console.log(`working directory is: ${process.env.PWD}`);
        const ciFileName = `/home/circleci/project/${filePath}.csv`;

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

    AxeReports.processResults(results, 'csv',  `${__dirname}../../../${filePath}`);
    console.error(`Expected no accessibility violations. Found: ${results.violations.length}`);
}