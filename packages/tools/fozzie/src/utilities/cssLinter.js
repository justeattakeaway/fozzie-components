const stylelint = require('stylelint');
const stylelintConfig = require('@justeat/stylelint-config-fozzie');

/**
 * Runs Stylelint against a string of CSS
 * @param {string} css - a string of CSS to run the linter against
 * @returns {Promise<stylelint.LinterResult>} - a promise that resolves to a Stylelint LinterResult object
 */
const lintCSS = css => stylelint
    .lint({
        code: css,
        config: stylelintConfig,
        formatter: 'verbose'
    });

module.exports = {
    lintCSS
};
