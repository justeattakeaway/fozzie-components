// eslint-disable-next-line import/no-extraneous-dependencies
import { source } from 'axe-core';

module.exports = {
    getAccessibilityTestResults: () => {
        browser.execute(source);

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

            const { axe } = window;
            if (!axe) {
                throw new Error('Unable to find axe-core');
            }

            axe.run(document, options, (err, results) => {
                if (err) throw err;
                done(results);
            });
        });
    }
};
