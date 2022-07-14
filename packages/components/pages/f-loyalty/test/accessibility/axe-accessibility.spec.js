import Loyalty from '../../test-utils/component-objects/f-loyalty.component';

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await Loyalty.load();
    });

    it('a11y - should test f-loyalty component WCAG compliance', async () => {
        // Act
        const axeResults = await Loyalty.getAxeResults('f-loyalty');

        // Assert
        await expect(axeResults.violations.length).toBe(0);
    });
});
