import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Accessibility tests', () => {
    beforeEach(() => {
        footer = new Footer();
    });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT'])
        .it('a11y - should test f-footer component WCAG compliance for country code "%s" with default options selected', tenant => {
            // Act
            footer.load({ locale: tenant });
            const axeResults = getAxeResults('f-footer');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ'])
        .it('a11y - should test f-footer component WCAG compliance for country code "%s" with extra options selected', tenant => {
            // Act
            footer.load({ locale: tenant, showCountrySelector: true });
            const axeResults = getAxeResults('f-footer');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
});
