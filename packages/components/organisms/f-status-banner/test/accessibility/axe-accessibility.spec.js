import StatusBanner from '../../test-utils/component-objects/f-status-banner.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-status-banner component WCAG compliance', async () => {
        // Act
        await StatusBanner.load();
        const axeResults = await StatusBanner.getAxeResults('f-status-banner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
