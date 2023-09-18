import SelfExclusion from '../../test-utils/component-objects/f-self-exclusion.component';

describe('f-self-exclusion - Accessibility tests', () => {
    it('a11y - should test f-self-exclusion component WCAG compliance', async () => {
        // Act
        await SelfExclusion.load();

        // Assert
        const axeResults = await SelfExclusion.getAxeResults('f-self-exclusion');
        await expect(axeResults.violations.length).toBe(0);
    });
});
