import Toggle from '../../test-utils/component-objects/f-toggle.component';

describe('f-toggle - Accessibility tests', () => {
    it('a11y - should test f-toggle component WCAG compliance', async () => {
        // Act
        await Toggle.load();

        // Assert
        const axeResults = await Toggle.getAxeResults('f-toggle');
        await expect(axeResults.violations.length).toBe(0);
    });
});
