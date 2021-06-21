import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');

const Header = require('../../test-utils/component-objects/f-header.component');

let header;

describe('Shared - f-header component tests', () => {

    forEach([['en-GB', true], ['en-GB', false],
        ['en-AU', true], ['en-AU', false],
        ['en-NZ', true], ['en-NZ', false],
        ['en-IE', true], ['en-IE', false],
        ['it-IT', true], ['it-IT', false],
        ['es-ES', true], ['es-ES', false]
    ])
    .it('should display component', (tenant, isLoggedIn) => {
        // Arrange
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', tenant);
        // Both props below should only show for UK
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');

        if (!isLoggedIn) {
            header.withQuery('&knob-User info', isLoggedIn);
        }
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'desktop');
    });

    forEach(['white', 'highlight', 'transparent'])
    .it('should display the "%s" header theme', theme => {
        // Arrange
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', 'en-GB');
        header.withQuery('&knob-Header theme', theme);
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'desktop');
    });

    it('should display all avalible countries', () => {
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', 'en-GB');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();
        header.moveToCountrySelector();

        // Assert
        browser.percyScreenshot('f-header - Country list', 'desktop');
    });

    forEach(['Show login/user info link', 'Show help link', 'Show country selector'])
    .it('should not display "%s" ', knobName => {
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', 'en-GB');
        header.withQuery(`&knob-${knobName}`, 'false');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();

        // Assert
        browser.percyScreenshot(`f-header - ${knobName} - False`, 'desktop');
    });

    it('should display all user account options', () => {
        header = new Header('organism', 'header-component');
        header.withQuery('&knob-Locale', 'en-GB');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);

        // Act
        header.open(pageUrl);
        header.waitForComponent();
        header.moveToUserAccount();

        // Assert
        browser.percyScreenshot('f-header - User Account dropdown', 'desktop');
    });
});
