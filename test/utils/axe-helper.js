const { source } = require('axe-core');

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
