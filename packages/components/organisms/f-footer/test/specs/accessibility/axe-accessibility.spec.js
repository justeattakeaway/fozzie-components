const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const forEach = require('mocha-each');
const Footer = require('../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('Accessibility tests', () => {

    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('a11y - should test f-footer component WCAG compliance with default options selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: false,
            countrySelector: false
        };

        // Act
        footer.open(footerData);
        const axeResults = getAccessibilityTestResults('f-footer');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach(['gb', 'au', 'ie', 'nz'])
    .it('a11y - should test f-footer component WCAG compliance with extra options selected', expectedLocale => {
        // Arrange
        const footerData = {
            locale: expectedLocale,
            courierLinks: false,
            countrySelector: true
        };

        // Act
        footer.open(footerData);
        const axeResults = getAccessibilityTestResults('f-footer');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
