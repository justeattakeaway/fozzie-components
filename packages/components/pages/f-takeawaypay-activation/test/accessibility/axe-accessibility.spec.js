import TakeawaypayActivationAuthenticated from '../../test-utils/component-objects/f-takeawaypayActivation-authenticated.component';
import TakeawaypayActivationUnauthenticated from '../../test-utils/component-objects/f-takeawaypayActivation-unauthenticated.component';
import TakeawaypayActivationError from '../../test-utils/component-objects/f-takeawaypayActivation-error.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-takeawaypayActivation component (unauthenticated) WCAG compliance', async () => {
        // Arrange
        await TakeawaypayActivationUnauthenticated.load({ isLoggedIn: false });

        // Act
        const axeResults = await TakeawaypayActivationUnauthenticated.getAxeResults('f-takeawaypayActivation-unauthenticated');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-takeawaypayActivation component (authenticated) WCAG compliance', async () => {
        // Arrange
        await TakeawaypayActivationAuthenticated.load({ isLoggedIn: true });

        // Act
        const axeResults = await TakeawaypayActivationAuthenticated.getAxeResults('f-takeawaypayActivation-authenticated');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-takeawaypayActivation component (successful activation) WCAG compliance', async () => {
        // Arrange
        await TakeawaypayActivationAuthenticated.load({ isLoggedIn: true });
        await TakeawaypayActivationAuthenticated.clickActivateTakeawayPayButton();
        await TakeawaypayActivationAuthenticated.waitForActivationSuccessComponent();

        // Act
        const axeResults = await TakeawaypayActivationAuthenticated.getAxeResults('f-takeawaypayActivation-successfulActivation');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-takeawaypayActivation component (activation error) WCAG compliance', async () => {
        // Arrange
        await TakeawaypayActivationError.load({ activationStatusResponse: '400' });

        // Act
        const axeResults = await TakeawaypayActivationError.getAxeResults('f-takeawaypayActivation-error');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
