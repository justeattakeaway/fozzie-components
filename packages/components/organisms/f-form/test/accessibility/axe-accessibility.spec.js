import Form from '../../test-utils/component-objects/f-form.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-form component WCAG compliance', async () => {
        // Arrange
        await Form.load();

        // Act
        const axeResults = await Form.getAxeResults('f-form');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
