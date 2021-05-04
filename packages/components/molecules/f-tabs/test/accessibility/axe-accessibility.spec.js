import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const Tabs = require('../../test-utils/component-objects/f-tabs.component');

const tabs = new Tabs();

describe('Accessibility tests', () => {
    beforeEach(() => {
        tabs.open();
        tabs.waitForComponent();
    });
    it('a11y - should test f-tabs component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-tabs');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
