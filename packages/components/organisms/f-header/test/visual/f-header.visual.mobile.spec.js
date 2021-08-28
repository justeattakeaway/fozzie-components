import forEach from 'mocha-each';

const Header = require('../../test-utils/component-objects/f-header.component');

let header = new Header();

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
            const queries = {
                'Locale': tenant,
                // Both props below should only show for UK
                'Show offers link': 'true',
                'Show delivery enquiry': 'true'
            };

            if (!isLoggedIn) {
                queries['User info'] = isLoggedIn;
            }

            // Act
            header.load(queries);
            header.openMobileNavigationBar();

            // Assert
            browser.percyScreenshot(`f-header - Base state - isLoggedIn: ${isLoggedIn} - ${tenant}`, 'mobile');
        });

    forEach(['white', 'highlight', 'transparent'])
        .it('should display the "%s" header theme', theme => {
            // Act
            header.load({
                'Locale': 'en-GB',
                'Header theme': theme
            });

            // Assert
            browser.percyScreenshot(`f-header - Theme colours - ${theme}`, 'mobile');
        });

    it('should display all avalible countries', () => {
        // Act
        header.load({ 'Locale': 'en-GB' });
        header.openMobileNavigationBar();
        header.openCountrySelector();

        // Assert
        browser.percyScreenshot('f-header - Country list', 'mobile');
    });

    forEach(['Show login/user info link', 'Show help link', 'Show country selector'])
        .it('should not display "%s" ', knobName => {
            // Act
            header.load({
                'Locale': 'en-GB',
                [knobName]: 'false'
            });
            header.openMobileNavigationBar();

            // Assert
            browser.percyScreenshot(`f-header - ${knobName} - False`, 'mobile');
        });
});
