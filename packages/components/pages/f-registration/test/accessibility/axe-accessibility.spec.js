import Registration from '../../test-utils/component-objects/f-registration.component';

describe('Accessibility tests', () => {
    beforeEach(async () => {
        await Registration.load();
    });

    it('a11y - should test f-registration component WCAG compliance', async () => {
        // Act
        const axeResults = await Registration.getAxeResults('f-registration');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
