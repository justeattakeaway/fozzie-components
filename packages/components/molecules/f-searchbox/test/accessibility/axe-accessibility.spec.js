import Searchbox from '../../test-utils/component-objects/f-searchbox.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-searchbox component WCAG compliance', async () => {
        // Act
        await Searchbox.load();
        const axeResults = await Searchbox.getAxeResults('f-searchbox');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
