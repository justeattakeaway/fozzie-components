import forEach from 'mocha-each';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');
const Header = require('../../test-utils/component-objects/f-header.component');

let header = new Header();

describe('Accessibility tests', () => {
    beforeEach(() => {
        // Arrange
        header = new Header();
    });

    forEach([
        'en-GB',
        'en-AU',
        'en-NZ',
        'en-IE',
        'it-IT',
        'es-ES'])
        .it('a11y - should test f-header component WCAG compliance for "%s"', locale => {
            // Act
            header.load({
                locale,
                showOffersLink: true,
                showDeliveryEnquiry: true
            });
            const axeResults = getAxeResults('f-header');

            // Assert
            expect(axeResults.violations.length).toBe(0);
        });
});
