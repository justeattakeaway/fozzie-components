import Mfa from '../../test-utils/component-objects/f-mfa.component';

describe('f-mfa - Component tests', () => {
    it('should display the f-mfa component', async () => {
        // Act
        await Mfa.load();

        // Assert
        const result = await Mfa.isComponentDisplayed();
        expect(result).toBe(true);
    });
});
