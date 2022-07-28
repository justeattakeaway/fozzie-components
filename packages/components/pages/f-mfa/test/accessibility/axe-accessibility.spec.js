import Mfa from '../../test-utils/component-objects/f-mfa.component';

describe('f-mfa - Accessibility tests', () => {
    it('a11y - should test f-mfa component WCAG compliance', async () => {
        // Act
        await Mfa.load();

        // Assert
        const axeResults = await Mfa.getAxeResults('f-mfa');
        expect(axeResults.violations.length).toBe(0);
    });
});
