import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Accessibility tests', () => {
    beforeEach(() => {
        footer = new Footer();
    });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
        .it('a11y - should test f-footer component WCAG compliance for country code "%s" with default options selected', tenant => {
            // Arrange
            footer.withQuery('args', `locale:${tenant}`);

            // Act
            footer.load();
            const axeResults = getAxeResults('f-footer');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ'])
        .it('a11y - should test f-footer component WCAG compliance for country code "%s" with extra options selected', tenant => {
            // Arrange
            footer.withQuery('args', `locale:${tenant};showCountrySelector:true`);

            // Act
            footer.load();
            const axeResults = getAxeResults('f-footer');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
});
