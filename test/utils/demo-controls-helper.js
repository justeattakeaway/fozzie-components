const componentControls = () => $('[data-test-id="component-controls"]');

const controlLocale = () => componentControls().$('[data-test-id="control-locale"]');

/**
 * Sets the locale of a component based off the 'Locale' control dropdown value
 * @param {string} locale
 */
exports.selectLocaleByValue = locale => {
    controlLocale().selectByAttribute('value', locale);
};
