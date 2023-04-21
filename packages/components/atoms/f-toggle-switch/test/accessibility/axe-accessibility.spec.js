import ToggleSwitch from '../../test-utils/component-objects/f-toggle-switch.component';

describe('f-toggle-switch - Accessibility tests', () => {
    it('a11y - should test f-toggle-switch component WCAG compliance', async () => {
        // Act
        await ToggleSwitch.load();

        // Assert
        const axeResults = await ToggleSwitch.getAxeResults('f-toggle-switch');
        await expect(axeResults.violations.length).toBe(0);
    });
});
