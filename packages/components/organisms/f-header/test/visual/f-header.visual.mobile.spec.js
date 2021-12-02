import forEach from 'mocha-each';

import { userInfo } from '../../test-utils/helpers/objects';

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
    ])
        .it('should display component', (tenant, isLoggedIn) => {
            // Arrange
            header = new Header()
                .withQuery('&knob-Locale', tenant)

                // Both props below should only show for UK
                .withQuery('&knob-Show offers link', 'true')
                .withQuery('&knob-Show delivery enquiry', 'true')

                .withQuery('&knob-Is logged in?', isLoggedIn);

            if (isLoggedIn) {
                header.withQuery('&knob-User info (if logged in)', JSON.stringify(userInfo));
            }

            // Act
            header.load();
            header.openMobileNavigationBar();

            // Assert
            browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'mobile');
        });

    forEach(['white', 'highlight', 'transparent'])
        .it('should display the "%s" header theme', theme => {
            // Arrange
            header = new Header()
                .withQuery('&knob-Locale', 'en-GB')
                .withQuery('&knob-Header theme', theme);

            // Act
            header.load();

            // Assert
            browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'mobile');
        });

    it('should display all avalible countries', () => {
        // Arrange
        header = new Header()
            .withQuery('&knob-Locale', 'en-GB');

        // Act
        header.load();
        header.openMobileNavigationBar();
        header.openCountrySelector();

        // Assert
        browser.percyScreenshot('f-header - Country list', 'mobile');
    });

    forEach(['Show login/user info link', 'Show help link', 'Show country selector'])
        .it('should not display "%s" ', knobName => {
            // Arrange
            header = new Header()
                .withQuery('&knob-Locale', 'en-GB')
                .withQuery(`&knob-${knobName}`, 'false');

            // Act
            header.load();
            header.openMobileNavigationBar();

            // Assert
            browser.percyScreenshot(`f-header - ${knobName} - False`, 'mobile');
        });

    it('should display any custom links', () => {
        // Arrange
        header = new Header()
            .withQuery('&knob-Locale', 'en-GB')
            .withQuery('&knob-Show offers link', false)
            .withQuery('&knob-Show delivery enquiry', false)
            .withQuery('&knob-Show custom nav links?', true);

        // Act
        header.load();
        header.openMobileNavigationBar();

        // Assert
        browser.percyScreenshot('f-header - with custom nav links', 'mobile');
    });
});
