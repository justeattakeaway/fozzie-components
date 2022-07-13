import Offers from '../../test-utils/component-objects/f-offers.component';

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await Offers.load();
    });

    // Offers not currently working in Storybook.
    it.skip('a11y - should test f-offers component WCAG compliance', async () => {
        // Act
        const axeResults = await Offers.getAxeResults('f-offers');

        // Assert
        await expect(axeResults.violations.length).toBe(0);
    });
});
