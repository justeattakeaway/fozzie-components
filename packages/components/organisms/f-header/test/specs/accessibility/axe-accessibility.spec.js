const forEach = require('mocha-each');
const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const Header = require('../../../test-utils/component-objects/f-header.component');
const header = new Header();

describe('Accessibility tests', () => {
    forEach(['gb', 'au', 'nz', 'ie', 'it', 'es', 'dk', 'no'])
    .it('a11y - should test f-header component WCAG compliance', expectedLocale => {
        // Act
        const headerData = {
            locale: expectedLocale,
            offers: true,
            delivery: true
        };

        header.open(headerData);
        header.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-header');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
