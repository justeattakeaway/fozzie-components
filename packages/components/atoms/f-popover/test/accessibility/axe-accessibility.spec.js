import Popover from '../../test-utils/component-objects/f-popover.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-popover component WCAG compliance', async () => {
        // Arrange
        await Popover.load();

        // Act
        const axeResults = await Popover.getAxeResults('f-popover');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
