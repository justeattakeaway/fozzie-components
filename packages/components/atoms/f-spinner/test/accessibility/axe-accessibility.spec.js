import Spinner from '../../test-utils/component-objects/f-spinner.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-spinner component WCAG compliance', async () => {
        // Arrange
        await Spinner.load();

        // Act
        const axeResults = await Spinner.getAxeResults('f-spinner');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
