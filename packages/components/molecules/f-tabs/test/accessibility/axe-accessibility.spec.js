import Tabs from '../../test-utils/component-objects/f-tabs.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-tabs component WCAG compliance', async () => {
        // Act
        await Tabs.load();
        const axeResults = await Tabs.getAxeResults('f-tabs');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
