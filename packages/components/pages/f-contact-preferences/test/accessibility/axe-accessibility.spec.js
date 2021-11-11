import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const ContactPreferences = require('../../test-utils/component-objects/f-contactPreferences.component');

let contactPreferences;

describe('Accessibility tests', () => {
    beforeEach(() => {
        contactPreferences = new ContactPreferences();

        contactPreferences.load();
        contactPreferences.waitForComponent();
    });

    it('a11y - should test f-contactPreferences component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-contactPreferences');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
