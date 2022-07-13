import Alert from '../../test-utils/component-objects/f-alert.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-alert component WCAG compliance', async () => {
        // Act
        await Alert.load();
        const axeResults = await Alert.getAxeResults('f-alert');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
