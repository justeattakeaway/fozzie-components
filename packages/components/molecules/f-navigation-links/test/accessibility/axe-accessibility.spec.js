import NavigationLinks from '../../test-utils/component-objects/f-navigation-links.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-navigation-links component WCAG compliance', async () => {
        // Arrange
        await NavigationLinks.load();
        const axeResults = await NavigationLinks.getAxeResults('f-navigation-links');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
