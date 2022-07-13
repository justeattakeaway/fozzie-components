import AccountInfo from '../../test-utils/component-objects/f-account-info.component';
import AccountInfoErrorCard from '../../test-utils/component-objects/f-account-info-error.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-account-info component WCAG compliance', async () => {
        // Act
        await AccountInfo.load();
        const axeResults = await AccountInfo.getAxeResults('f-account-info');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-account-info error card WCAG compliance', async () => {
        // Act
        await AccountInfoErrorCard.load({ apiState: 'get-details-fails' });
        const axeResults = await AccountInfoErrorCard.getAxeResults('f-account-info-error-card');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
