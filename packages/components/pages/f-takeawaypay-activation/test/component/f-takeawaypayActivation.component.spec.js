import TakeawaypayActivationAuthenticated from '../../test-utils/component-objects/f-takeawaypayActivation-authenticated.component';
import TakeawaypayActivationUnauthenticated from '../../test-utils/component-objects/f-takeawaypayActivation-unauthenticated.component';
import TakeawaypayActivationError from '../../test-utils/component-objects/f-takeawaypayActivation-error.component';


describe('f-takeawaypay-activation component tests - unauthenticated', () => {
    beforeEach(async () => {
        // Arrange
        await TakeawaypayActivationUnauthenticated.load({ isLoggedIn: false });
    });

    it('should display the f-takeawaypay-activation component when the user is not authenticated', async () => {
        // Assert
        await expect(await TakeawaypayActivationUnauthenticated.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - I have an account - button is clicked', async () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        await TakeawaypayActivationUnauthenticated.clickUnauthenticatedLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked', async () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        await TakeawaypayActivationUnauthenticated.clickUnauthenticatedRegisterButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(registerPath);
    });
});

describe('f-takeawaypayActivation component tests - logged in as a guest', () => {
    beforeEach(async () => {
        // Arrange
        await TakeawaypayActivationUnauthenticated.load({ isLoggedIn: false });
    });

    it('should display the f-takeawaypayActivation component when the user is logged in as a guest', async () => {
        // Assert
        await expect(await TakeawaypayActivationUnauthenticated.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - I have an account - button is clicked when logged in as a guest', async () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        await TakeawaypayActivationUnauthenticated.clickUnauthenticatedLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked when logged in as a guest', async () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        await TakeawaypayActivationUnauthenticated.clickUnauthenticatedRegisterButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(registerPath);
    });
});

describe('f-takeawaypayActivation component tests - authenticated', () => {
    beforeEach(async () => {
        // Arrange
        await TakeawaypayActivationAuthenticated.load({ isLoggedIn: true });
    });

    it('should display the f-takeawaypayActivation component when the user is authenticated', async () => {
        // Assert
        await expect(await TakeawaypayActivationAuthenticated.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - Use a different account - button is clicked', async () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        await TakeawaypayActivationAuthenticated.clickLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked', async () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        await TakeawaypayActivationAuthenticated.clickRegisterButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(registerPath);
    });

    it('should display the correct status after a successful TakeawayPay activation', async () => {
        // Act
        await TakeawaypayActivationAuthenticated.clickActivateTakeawayPayButton();
        await TakeawaypayActivationAuthenticated.waitForActivationSuccessComponent();

        // Assert
        await expect(await TakeawaypayActivationAuthenticated.isActivationSuccessComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - Start ordering - button is clicked after a successful TakeawayPay activation', async () => {
        // Arrange
        const homePath = '/home';

        // Act
        await TakeawaypayActivationAuthenticated.clickActivateTakeawayPayButton();
        await TakeawaypayActivationAuthenticated.waitForActivationSuccessComponent();
        await TakeawaypayActivationAuthenticated.clickStartOrderingButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(homePath);
    });
});

describe('f-takeawaypayActivation component tests - error page', () => {
    beforeEach(async () => {
        // Arrange
        await TakeawaypayActivationError.load({ activationStatusResponse: '400' });
    });

    it('should display the f-takeawaypayActivation component when there is an error', async () => {
        // Assert
        await expect(await TakeawaypayActivationError.isComponentDisplayed()).toBe(true);
    });
});
