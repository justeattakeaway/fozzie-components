import Breadcrumbs from '../../test-utils/component-objects/f-breadcrumbs.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-breadcrumbs component WCAG compliance', async () => {
        // Act
        await Breadcrumbs.load();
        const axeResults = await Breadcrumbs.getAxeResults('f-breadcrumbs');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
