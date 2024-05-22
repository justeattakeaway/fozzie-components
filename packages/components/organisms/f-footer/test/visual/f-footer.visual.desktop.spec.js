import Footer from '../../test-utils/component-objects/f-footer.component';

let locales;

describe('f-footer - Desktop Visual Tests', () => {
    locales = [
        'en-GB',
        'en-AU',
        'en-IE',
        'es-ES',
        'it-IT'
    ];

    locales.forEach(locale => {
        it(`should display the base footer for tenant: "${locale}"`, async () => {
            // Act
            await Footer.load({ locale });

            // Assert
            await browser.percyScreenshot(`f-footer - Base - ${locale}`, 'desktop');
        });

        it(`should display the footer with country selector for tenant: "${locale}"`, async () => {
            // Act
            await Footer.load({ locale, showCountrySelector: true });

            // Assert
            await browser.percyScreenshot(`f-footer - Country Selector - ${locale}`, 'desktop');
        });

        it(`should display slim footer when no content links are provided for tenant: "${locale}"`, async () => {
            // Act
            await Footer.load({ locale, showLinksContent: false });

            // Assert
            await browser.percyScreenshot(`f-footer - Slim Footer - ${locale}`, 'desktop');
        });
    });

    locales = ['en-AU'];

    locales.forEach(locale => {
        it(`should display the footer with courier links for tenant: "${locale}"`, async () => {
            // Act
            await Footer.load({ locale, showCourierLinks: true });

            // Assert
            await browser.percyScreenshot(`f-footer - Courier Links - ${locale}`, 'desktop');
        });

        it(`should display the footer with courier links and country selector for tenant: "${locale}"`, async () => {
            // Act
            await Footer.load({ locale, showCountrySelector: true, showCourierLinks: true });

            // Assert
            await browser.percyScreenshot(`f-footer - Courier Links and Country Selector - ${locale}`, 'desktop');
        });
    });
});
