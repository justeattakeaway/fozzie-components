import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Shared - f-header component tests', () => {
    forEach([
        ['en-GB', true], ['en-GB', false],
        ['en-AU', true], ['en-AU', false],
        ['en-NZ', true], ['en-NZ', false],
        ['en-IE', true], ['en-IE', false],
        ['it-IT', true], ['it-IT', false],
        ['es-ES', true], ['es-ES', false]
    ]).it('should display component', async (tenant, isLoggedIn) => {
        // Arrange
        const controls = [
            `locale:${tenant}`,
            'showOffersLink:true', // Should show for AU, IE, NZ and UK only
            'showDeliveryEnquiry:true', // Should show for AU, IE, NZ and UK only
            ...(isLoggedIn ? [] : ['userInfoProp:!undefined'])
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        await header.load();

        // Assert
        await browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'desktop');
    });

    forEach([
        'white',
        'highlight',
        'transparent'
    ]).it('should display the "%s" header theme', async theme => {
        // Arrange
        const controls = [
            'locale:en-GB',
            `headerBackgroundTheme:${theme}`
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        await header.load();

        // Assert
        await browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'desktop');
    });

    forEach([
        'showLoginInfo',
        'showHelpLink',
        'showCountrySelector'
    ]).it('should not display "%s" ', async knobName => {
        // Arrange
        const controls = [
            'locale:en-GB',
            `${knobName}:false`
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        await header.load();

        // Assert
        await browser.percyScreenshot(`f-header - ${knobName} - False`, 'desktop');
    });

    forEach([
        'userAccount',
        'countrySelector'
    ])
    .it('should display the %s dropdown lists on hover', async link => {
        // Arrange
        const controls = 'locale:en-GB';

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        await header.load();
        await header.moveToNavigationLink(link);

        // Assert
        await browser.percyScreenshot('f-header - %s dropdown', 'desktop');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should display any custom links', async () => {
        // Arrange
        const controls = [
            'locale:en-GB',
            'showOffersLink:false',
            'showDeliveryEnquiry:false'
            // Set custom links here
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        await header.load();
        await header.openMobileNavigationBar();

        // Assert
        await browser.percyScreenshot('f-header - with custom nav links', 'desktop');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should be able to show only custom links', async () => {
        // Arrange
        const controls = [
            'locale:en-GB',
            'showHelpLink:false',
            'showLoginInfo:false',
            'showOffersLink:false',
            'showCountrySelector:false',
            'showDeliveryEnquiry:false'
            // Set custom links here
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        await header.load();
        await header.openMobileNavigationBar();

        // Assert
        await browser.percyScreenshot('f-header - custom nav links only', 'desktop');
    });

    it('should display link in hover state', async () => {
        header = new Header();

        // Act
        await header.load();
        await header.hoverOverLink('help');

        // Assert
        await browser.percyScreenshot('f-header - hover state', 'desktop');
    });

    it('should display link in focus state', async () => {
        header = new Header();

        // Act
        await header.load();
        await header.pressDownTabKey(3);

        // Assert
        await browser.percyScreenshot('f-header - focus state', 'desktop');
    });
});
