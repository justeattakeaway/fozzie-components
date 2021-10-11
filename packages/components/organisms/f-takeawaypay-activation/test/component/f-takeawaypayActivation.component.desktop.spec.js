const TakeawaypayActivation = require('../../test-utils/component-objects/f-takeawaypayActivation.component');

let takeawayPayComponent;

describe('f-takeawaypayActivation component tests - unauthenticated', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        takeawayPayComponent.load();
    });

    it('should display the f-takeawaypayActivation component when the user is not authenticated', () => {
        // Assert
        expect(takeawayPayComponent.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - I have an account - button is clicked', () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        takeawayPayComponent.clickUnauthenticatedLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked', () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        takeawayPayComponent.clickUnauthenticatedRegisterButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(registerPath);
    });
});

describe('f-takeawaypayActivation component tests - logged in as a guest', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        takeawayPayComponent
            .withQuery('knob-Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJzdWIiOiIxODcwMzA5MyIsIm5hbWUiOiJKb2UgQmxvZ2dzIiwiZ2xvYmFsX3VzZXJfaWQiOiJVN05SQWxXQWc1ek9kc2RSZ2Y3bmtUeW9pOTBYRW89IiwiZ2l2ZW5fbmFtZSI6IkpvZSIsImZhbWlseV9uYW1lIjoiQmxvZ2dzIiwicm9sZSI6Ikd1ZXN0IiwiaWF0IjoxNjE1NDY5NTE2fQ.d-dLpZM8vi7IR1GdqZI9IPzUcjnidU-7qO62B3Nfk6I')
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        takeawayPayComponent.load();
    });

    it('should display the f-takeawaypayActivation component when the user is logged in as a guest', () => {
        // Assert
        expect(takeawayPayComponent.isComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - I have an account - button is clicked when logged in as a guest', () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        takeawayPayComponent.clickUnauthenticatedLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked when logged in as a guest', () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        takeawayPayComponent.clickUnauthenticatedRegisterButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(registerPath);
    });
});

describe('f-takeawaypayActivation component tests - authenticated', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        takeawayPayComponent
            .withQuery('knob-Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU')
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register');
        takeawayPayComponent.load('loggedIn');
    });

    it('should display the f-takeawaypayActivation component when the user is authenticated', () => {
        // Assert
        expect(takeawayPayComponent.isLoggedInComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - Use a different account - button is clicked', () => {
        // Arrange
        const loginPath = '/account/login';

        // Act
        takeawayPayComponent.clickAuthenticatedLoginButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(loginPath);
    });

    it('should navigate to the correct link when the - Create a new account - button is clicked', () => {
        // Arrange
        const registerPath = '/account/register';

        // Act
        takeawayPayComponent.clickAuthenticatedRegisterButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(registerPath);
    });

    it('should display the correct status after a successful TakeawayPay activation', () => {
        // Act
        takeawayPayComponent.clickActivateTakeawayPayButton();
        takeawayPayComponent.waitForActivationSuccessComponent();

        // Assert
        expect(takeawayPayComponent.isActivationSuccessComponentDisplayed()).toBe(true);
    });

    it('should navigate to the correct link when the - Start ordering - button is clicked after a successful TakeawayPay activation', () => {
        // Arrange
        const homePath = '/home';

        // Act
        takeawayPayComponent.clickActivateTakeawayPayButton();
        takeawayPayComponent.waitForActivationSuccessComponent();
        takeawayPayComponent.clickStartOrderingButton();
        const { pathname } = new URL(browser.getUrl());

        // Assert
        expect(pathname).toEqual(homePath);
    });
});

describe('f-takeawaypayActivation component tests - error page', () => {
    beforeEach(() => {
        // Arrange
        takeawayPayComponent = new TakeawaypayActivation();
        takeawayPayComponent
            .withQuery('knob-Authentication', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZS5ibG9nZ3NAanVzdGVhdHRha2Vhd2F5LmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjEtMDItMDhUMTA6Mjc6NDkuMTkzMDAwMFoiLCJuYW1lIjoiSm9lIEJsb2dncyIsImdsb2JhbF91c2VyX2lkIjoiVTdOUkFsV0FnNXpPZHNkUmdmN25rVHlvaTkwWEVvPSIsImdpdmVuX25hbWUiOiJKb2UiLCJmYW1pbHlfbmFtZSI6IkJsb2dncyIsImlhdCI6MTYxNTQ2OTUxNn0.VapH6uHnn4lHIkvN_mS9A9IVVWL0YPNE39gDDD-l7SU')
            .withQuery('knob-Employee Id', '12345')
            .withQuery('knob-Home URL', '/home')
            .withQuery('knob-Login URL', '/account/login')
            .withQuery('knob-Registration URL', '/account/register')
            .withQuery('knob-Activation Status Response', '400');
        takeawayPayComponent.load('error');
    });

    it('should display the f-takeawaypayActivation component when there is an error', () => {
        // Assert
        expect(takeawayPayComponent.isErrorComponentDisplayed()).toBe(true);
    });
});