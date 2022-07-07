import Header from '../../test-utils/component-objects/f-header.component';

let tests;

describe('Shared - f-header component tests', () => {
    tests = [
        { tenant: 'en-GB', isLoggedIn: true },
        { tenant: 'en-GB', isLoggedIn: false },
        { tenant: 'en-AU', isLoggedIn: true },
        { tenant: 'en-AU', isLoggedIn: false },
        { tenant: 'en-NZ', isLoggedIn: true },
        { tenant: 'en-NZ', isLoggedIn: false },
        { tenant: 'en-IE', isLoggedIn: true },
        { tenant: 'en-IE', isLoggedIn: false },
        { tenant: 'it-IT', isLoggedIn: true },
        { tenant: 'it-IT', isLoggedIn: false },
        { tenant: 'es-ES', isLoggedIn: true },
        { tenant: 'es-ES', isLoggedIn: false }
    ];

    tests.forEach(({ tenant, isLoggedIn }) => {
        it('should display component', async () => {
            // Arrange
            const querystring = {
                locale: tenant,
                showOffersLink: true,
                showDeliveryEnquiry: true
            };

            if (!isLoggedIn) {
                querystring.userInfoProp = '!undefined';
            }

            // Act
            await Header.load(querystring);
            await Header.openMobileNavigationBar();

            // Assert
            await browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'mobile');
        });
    });

    tests = [
        { tenant: 'en-GB', theme: 'white' },
        { tenant: 'en-GB', theme: 'highlight' },
        { tenant: 'en-GB', theme: 'transparent' }
    ];

    tests.forEach(({ tenant, theme }) => {
        it(`should display the "${tenant} - ${theme}" header theme`, async () => {
            // Act
            await Header.load({ locale: tenant, headerBackgroundTheme: theme });

            // Assert
            await browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'mobile');
        });

        it(`should display the mobile nav correctly for theme ${theme} - ${tenant}`, async () => {
            // Act
            await Header.load({
                locale: tenant,
                showOffersLink: true,
                showDeliveryEnquiry: true,
                headerBackgroundTheme: theme
            });
            await Header.openMobileNavigationBar();

            // Assert
            await browser.percyScreenshot(`f-header - Mobile nav theme colours - ${theme}`, 'mobile');
        });
    });

    it('should display all available countries', async () => {
        // Act
        await Header.load({ locale: 'en-GB' });
        await Header.openMobileNavigationBar();
        await Header.openCountrySelector();

        // Assert
        await browser.percyScreenshot('f-header - Country list', 'mobile');
    });

    tests = [
        { tenant: 'en-GB', control: 'showLoginInfo' },
        { tenant: 'en-GB', control: 'showHelpLink' },
        { tenant: 'en-GB', control: 'showCountrySelector' }
    ];

    tests.forEach(({ tenant, control }) => {
        it(`should not display "${control}" `, async () => {
            // Act
            await Header.load({ locale: tenant, [control]: false });
            await Header.openMobileNavigationBar();

            // Assert
            await browser.percyScreenshot(`f-header - ${control} - False`, 'mobile');
        });
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should display any custom links', async () => {
        // Act
        await Header.load({
            locale: 'en-GB',
            showOffersLink: false,
            showDeliveryEnquiry: false
            // Set custom links here
        });
        await Header.openMobileNavigationBar();

        // Assert
        await browser.percyScreenshot('f-header - with custom nav links', 'mobile');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should be able to show only custom links', async () => {
        // Act
        await Header.load({
            locale: 'en-GB',
            showHelpLink: false,
            showLoginInfo: false,
            showOffersLink: false,
            showCountrySelector: false,
            showDeliveryEnquiry: false
            // Set custom links here
        });
        await Header.openMobileNavigationBar();

        // Assert
        await browser.percyScreenshot('f-header - custom nav links only', 'mobile');
    });

    it('should display correctly with tallBelowMid prop', async () => {
        // Act
        await Header.load({
            locale: 'en-GB',
            headerBackgroundTheme: 'highlight',
            tallBelowMid: true
        });

        // Assert
        await browser.percyScreenshot('f-header - tallBelowMid - highlight', 'mobile');
    });

    it('should display link in hover state', async () => {
        // Act
        await Header.load();
        await Header.openMobileNavigationBar();
        await Header.hoverOverLink('help');

        // Assert
        await browser.percyScreenshot('f-header - hover state', 'mobile');
    });

    it('should display link in focus state', async () => {
        // Act
        await Header.load();
        await Header.openMobileNavigationBar();
        await Header.pressDownTabKey(3);

        // Assert
        await browser.percyScreenshot('f-header - focus state', 'mobile');
    });
});
