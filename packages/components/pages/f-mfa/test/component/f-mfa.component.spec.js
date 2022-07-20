const Mfa = require('../../test-utils/component-objects/f-mfa.component');

describe('f-mfa - Component tests', () => {
    let mfa;

    beforeEach(() => {
        // Arrange
        mfa = new Mfa();
    });

    it('should display the f-mfa component', async () => {
        // Act
        await mfa.load();

        // Assert
        const result = await mfa.isComponentDisplayed();
        expect(result).toBe(true);
    });
});
