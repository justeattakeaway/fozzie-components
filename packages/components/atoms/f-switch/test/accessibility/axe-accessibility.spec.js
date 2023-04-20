import Switch from '../../test-utils/component-objects/f-switch.component';

describe('f-switch - Accessibility tests', () => {
    it('a11y - should test f-switch component WCAG compliance', async () => {
        // Act
        await Switch.load();

        // Assert
        const axeResults = await Switch.getAxeResults('f-switch');
        await expect(axeResults.violations.length).toBe(0);
    });
});
