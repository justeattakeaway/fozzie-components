import UserMessage from '../../test-utils/component-objects/f-user-message.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-user-message component WCAG compliance', async () => {
        // Act
        await UserMessage.load();
        const axeResults = await UserMessage.getAxeResults('f-user-message');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
