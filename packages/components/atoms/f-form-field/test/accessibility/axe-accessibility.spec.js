import FormField from '../../test-utils/component-objects/f-form-field.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-formField component WCAG compliance', async () => {
        // Arrange
        await FormField.load();
        // Act
        const axeResults = await FormField.getAxeResults('f-form-field');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
