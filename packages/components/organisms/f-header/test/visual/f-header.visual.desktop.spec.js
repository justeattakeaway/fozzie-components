import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Shared - f-header component tests', () => {
    beforeEach(() => {
        // Arrange
        header = new Header();
    });

    forEach([
        ['en-GB', true],
        ['en-GB', false],
        ['en-AU', true],
        ['en-AU', false],
        ['en-NZ', true],
        ['en-NZ', false],
        ['en-IE', true],
        ['en-IE', false],
        ['it-IT', true],
        ['it-IT', false],
        ['es-ES', true],
        ['es-ES', false]
    ]).it('should display component', async (tenant, isLoggedIn) => {
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
        await header.load(querystring);

        // Assert
        await browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'desktop');
    });

    forEach([
        ['en-GB', 'white'],
        ['en-GB', 'highlight'],
        ['en-GB', 'transparent']
    ]).it('should display the "%s - %s" header theme', async (tenant, theme) => {
        // Act
        await header.load({ locale: tenant, headerBackgroundTheme: `${theme}` });

        // Assert
        await browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'desktop');
    });

    forEach([
        ['en-GB', 'showLoginInfo'],
        ['en-GB', 'showHelpLink'],
        ['en-GB', 'showCountrySelector']
    ]).it('should not display "%s" ', async (tenant, control) => {
        // Act
        await header.load({ locale: tenant, [control]: false });

        // Assert
        await browser.percyScreenshot(`f-header - ${control} - False`, 'desktop');
    });

    forEach([
        ['en-GB', 'userAccount'],
        ['en-GB', 'countrySelector']
    ])
    .it('should display the "%s %s" dropdown lists on hover', async (tenant, link) => {
        // Act
        await header.load({ locale: tenant });
        await header.moveToNavigationLink(link);

        // Assert
        await browser.percyScreenshot('f-header - %s dropdown', 'desktop');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should display any custom links', async () => {
        // Act
        await header.load({
            locale: 'en-GB',
            showOffersLink: false,
            showDeliveryEnquiry: false
            // Set custom links here
        });
        await header.openMobileNavigationBar();

        // Assert
        await browser.percyScreenshot('f-header - with custom nav links', 'desktop');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should be able to show only custom links', async () => {
        // Act
        await header.load({
            locale: 'en-GB',
            showHelpLink: false,
            showLoginInfo: false,
            showOffersLink: false,
            showCountrySelector: false,
            showDeliveryEnquiry: false
            // Set custom links here
        });
        await header.openMobileNavigationBar();

        // Assert
        await browser.percyScreenshot('f-header - custom nav links only', 'desktop');
    });

    it('should display link in hover state', async () => {
        // Act
        await header.load();
        await header.hoverOverLink('help');

        // Assert
        await browser.percyScreenshot('f-header - hover state', 'desktop');
    });

    it('should display link in focus state', async () => {
        // Act
        await header.load();
        await header.pressDownTabKey(3);

        // Assert
        await browser.percyScreenshot('f-header - focus state', 'desktop');
    });
});
