import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Header = require('../../test-utils/component-objects/f-header.component');

const header = new Header();

describe('Accessibility tests', () => {
    forEach(['en-GB', 'en-AU', 'en-NZ', 'en-IE', 'it-IT', 'es-ES'])
        .it('a11y - should test f-header component WCAG compliance for "%s"', tenant => {
            // Arrange
            header.withQuery('args', `locale:${tenant};showOffersLink:true;showDeliveryEnquiry:true`);

            // Act
            header.load();
            const axeResults = getAxeResults('f-header');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
});
