const TakeawaypayActivation = require('../../test-utils/component-objects/f-takeawaypayActivation.component');
const {
    AUTHENTICATION_JWT,
    GUEST_AUTHENTICATION_JWT
} = require('../../test-utils/constants/f-takeawaypayActivation');

let takeawayPayComponent;

describe('f-takeawaypay-activation component tests - unauthenticated', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        await takeawayPayComponent.load();
    });

    it('should display the f-takeawaypay-activation component when the user is not authenticated', async () => {
        // Assert
        await expect(await takeawayPayComponent.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - I have an account - button is clicked', async () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        await takeawayPayComponent.clickUnauthenticatedLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked', async () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        await takeawayPayComponent.clickUnauthenticatedRegisterButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(registerPath);
    });
});

describe('f-takeawaypayActivation component tests - logged in as a guest', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        await takeawayPayComponent
            .withQuery('knob-Authentication', GUEST_AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        await takeawayPayComponent.load();
    });

    it('should display the f-takeawaypayActivation component when the user is logged in as a guest', async () => {
        // Assert
        await expect(await takeawayPayComponent.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - I have an account - button is clicked when logged in as a guest', async () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        await takeawayPayComponent.clickUnauthenticatedLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked when logged in as a guest', async () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        await takeawayPayComponent.clickUnauthenticatedRegisterButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(registerPath);
    });
});

describe('f-takeawaypayActivation component tests - authenticated', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        await takeawayPayComponent
            .withQuery('knob-Authentication', AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        await takeawayPayComponent.load('loggedIn');
    });

    it('should display the f-takeawaypayActivation component when the user is authenticated', async () => {
        // Assert
        await expect(await takeawayPayComponent.isLoggedInComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - Use a different account - button is clicked', async () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        await takeawayPayComponent.clickAuthenticatedLoginButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked', async () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        await takeawayPayComponent.clickAuthenticatedRegisterButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(registerPath);
    });

    it('should display the correct status after a successful TakeawayPay activation', async () => {
        // Act
        await takeawayPayComponent.clickActivateTakeawayPayButton();
        await takeawayPayComponent.waitForActivationSuccessComponent();

        // Assert
        await expect(await takeawayPayComponent.isActivationSuccessComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - Start ordering - button is clicked after a successful TakeawayPay activation', async () => {
        // Arrange
        const homePath = '/home';

        // Act
        await takeawayPayComponent.clickActivateTakeawayPayButton();
        await takeawayPayComponent.waitForActivationSuccessComponent();
        await takeawayPayComponent.clickStartOrderingButton();
        const { pathname } = new URL(await browser.getUrl());

        // Assert
        await expect(pathname).toEqual(homePath);
    });
});

describe('f-takeawaypayActivation component tests - error page', () => {
    beforeEach(async () => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        await takeawayPayComponent
            .withQuery('knob-Authentication', AUTHENTICATION_JWT)
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register')
            .withQuery('knob-Activation Status Response', '400');
        await takeawayPayComponent.load('error');
    });

    it('should display the f-takeawaypayActivation component when there is an error', async () => {
        // Assert
        await expect(await takeawayPayComponent.isErrorComponentDisplayed()).toBe(true);
    });
});
