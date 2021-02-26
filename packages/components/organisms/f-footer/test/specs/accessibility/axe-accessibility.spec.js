const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const Footer = require('../../../test-utils/component-objects/f-footer.component');
const footer = new Footer();

describe('Accessibility tests', () => {

    it('a11y - should test f-footer component WCAG compliance for AU Locale', () => {
        // Act
        footer.open('au');
        const axeResults = getAccessibilityTestResults('f-footer');
    });

    it('a11y - should test f-footer component WCAG compliance for GB Locale', () => {
        // Act
        footer.open();
        const axeResults = getAccessibilityTestResults('f-footer');
    });
});
