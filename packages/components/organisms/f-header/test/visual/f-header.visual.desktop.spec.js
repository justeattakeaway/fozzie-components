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

            // Assert
            await browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'desktop');
        });
    });

    tests = [
        { tenant: 'en-GB', theme: 'white' },
        { tenant: 'en-GB', theme: 'highlight' },
        { tenant: 'en-GB', theme: 'transparent' },
        { tenant: 'en-GB', theme: 'whiteSeamless' }
    ];

    tests.forEach(({ tenant, theme }) => {
        it(`should display the "${tenant} - ${theme}" header theme`, async () => {
            // Act
            await Header.load({ locale: tenant, headerBackgroundTheme: `${theme}` });

            // Assert
            await browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'desktop');
        });
    });

    tests = [
        { tenant: 'en-GB', control: 'showLoginInfo', displayState: true },
        { tenant: 'en-GB', control: 'showHelpLink', displayState: true },
        { tenant: 'en-GB', control: 'showCountrySelector', displayState: true },
        { tenant: 'en-GB', control: 'showCorporateLink', displayState: true }
    ];

    tests.forEach(({ tenant, control, displayState }) => {
        it(`should display "${control}" - ${displayState} `, async () => {
            // Act
            await Header.load({ locale: tenant, [control]: displayState });

            // Assert
            await browser.percyScreenshot(`f-header - ${control} - ${displayState}`, 'desktop');
        });
    });

    tests = [
        { tenant: 'en-GB', link: 'userAccount' },
        { tenant: 'en-GB', link: 'countrySelector' }
    ];

    tests.forEach(({ tenant, link }) => {
        it(`should display the "${tenant} ${link}" dropdown lists on hover`, async () => {
            // Act
            await Header.load({ locale: tenant });
            await Header.moveToNavigationLink(link);

            // Assert
            await browser.percyScreenshot(`f-header - ${link} dropdown`, 'desktop');
        });
    });


    describe('isCondensedOnMid', () => {
        // TODO -  Add a desktop setWindowSize to wido beforeTest similar to mobile.
        //         Last Test rests viewport back to original size
        tests = [
            { viewport: { w: 770, h: 500 } },
            { viewport: { w: 830, h: 500 } },
            { viewport: { w: 930, h: 500 } },
            { viewport: { w: 1025, h: 500 } },
            { viewport: { w: 1130, h: 500 } },
            { viewport: { w: 1050, h: 800 } }
        ];

        const scrollBarOffset = 12;

        tests.forEach(({ viewport }) => {
            it(`should condense header elements at various viewports ${viewport.w}x${viewport.h}`, async () => {
                // Act
                await Header.load({
                    locale: 'en-GB',
                    showLoginInfo: true,
                    showHelpLink: true,
                    showCountrySelector: true,
                    showCorporateLink: true,
                    showOffersLink: true,
                    showDeliveryEnquiry: true,
                    isCondensedOnMid: true
                });

                // Browser size != Viewport Size, scrollBarOffset pixels is added for the scroll bar
                browser.setWindowSize(viewport.w + scrollBarOffset, viewport.h);

                // Assert
                await browser.percyScreenshot(`f-header - condenseOnMid ${viewport.w}x${viewport.h}`, 'desktop');
            });
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
        await browser.percyScreenshot('f-header - with custom nav links', 'desktop');
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
        await browser.percyScreenshot('f-header - custom nav links only', 'desktop');
    });

    it('should display link in hover state', async () => {
        // Act
        await Header.load();
        await Header.hoverOverLink('help');

        // Assert
        await browser.percyScreenshot('f-header - hover state', 'desktop');
    });

    it('should display link in focus state', async () => {
        // Act
        await Header.load();
        await Header.pressDownTabKey(3);

        // Assert
        await browser.percyScreenshot('f-header - focus state', 'desktop');
    });
});
