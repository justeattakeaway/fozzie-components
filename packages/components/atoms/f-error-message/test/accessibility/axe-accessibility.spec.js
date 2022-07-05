import ErrorMessage from '../../test-utils/component-objects/f-error-message.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-error-message component WCAG compliance', async () => {
        // Arrange
        await ErrorMessage.load();
        // Act
        const axeResults = await ErrorMessage.getAxeResults('f-error-message');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
