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
    ]).it('should display component', (tenant, isLoggedIn) => {
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
        header.load();
        header.openMobileNavigationBar();

        // Assert
        browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'mobile');
    });

    forEach([
        'white',
        'highlight',
        'transparent'
    ]).it('should display the "%s" header theme', theme => {
        // Arrange
        const controls = [
            'locale:en-GB',
            `headerBackgroundTheme:${theme}`
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        header.load();

        // Assert
        browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'mobile');
    });

    forEach([
        'white',
        'highlight',
        'transparent'
    ]).it('should display the mobile nav correctly for theme %s', theme => {
        // Arrange
        const controls = [
            'locale:en-GB',
            'showOffersLink:true',
            'showDeliveryEnquiry:true',
            `headerBackgroundTheme:${theme}`
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        header.load();
        header.openMobileNavigationBar();

        // Assert
        browser.percyScreenshot(`f-header - Mobile nav theme colours - ${theme}`, 'mobile');
    });

    it('should display all available countries', () => {
        // Arrange
        const controls = 'locale:en-GB';

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        header.load();
        header.openMobileNavigationBar();
        header.openCountrySelector();

        // Assert
        browser.percyScreenshot('f-header - Country list', 'mobile');
    });

    forEach([
        'showLoginInfo',
        'showHelpLink',
        'showCountrySelector'
    ]).it('should not display "%s" ', knobName => {
        // Arrange
        const controls = [
            'locale:en-GB',
            `${knobName}:false`
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        header.load();
        header.openMobileNavigationBar();

        // Assert
        browser.percyScreenshot(`f-header - ${knobName} - False`, 'mobile');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should display any custom links', () => {
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
        header.load();
        header.openMobileNavigationBar();

        // Assert
        browser.percyScreenshot('f-header - with custom nav links', 'mobile');
    });

    // Not currently possible to set complex values (i.e., arrays) for controls via query strings.
    // https://storybook.js.org/docs/vue/essentials/controls#dealing-with-complex-values
    // https://github.com/storybookjs/storybook/issues/14420
    it.skip('should be able to show only custom links', () => {
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
        header.load();
        header.openMobileNavigationBar();

        // Assert
        browser.percyScreenshot('f-header - custom nav links only', 'mobile');
    });

    forEach([
        'highlight'
    ]).it('should display correctly with tallBelowMid prop', theme => {
        // Arrange
        const controls = [
            'locale:en-GB',
            `headerBackgroundTheme:${theme}`,
            'tallBelowMid:true'
        ].join(';');

        header = new Header();
        header.path += `&args=${controls}`;

        // Act
        header.load();

        // Assert
        browser.percyScreenshot(`f-header - tallBelowMid - ${theme}`, 'mobile');
    });
});
