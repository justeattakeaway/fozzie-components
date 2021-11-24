import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const AccountInfo = require('../../test-utils/component-objects/f-accountInfo.component');

const accountInfo = new AccountInfo();

describe('Accessibility tests', () => {
    beforeEach(() => {
        accountInfo.load();
    });

    it('a11y - should test f-accountInfo component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-accountInfo');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
