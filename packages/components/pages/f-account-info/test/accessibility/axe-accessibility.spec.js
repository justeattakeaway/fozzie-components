import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const AccountInfo = require('../../test-utils/component-objects/f-account-info.component');

const accountInfo = new AccountInfo();

describe('Accessibility tests', () => {
    it('a11y - should test f-account-info component WCAG compliance', () => {
        // Arrange
        accountInfo.load();

        // Act
        const axeResults = getAxeResults('f-account-info');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-account-info component WCAG compliance', () => {
        // Arrange
        accountInfo.load({ apiState: 'get-details-fails' });

        // Act
        const axeResults = getAxeResults('f-account-info-error-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
