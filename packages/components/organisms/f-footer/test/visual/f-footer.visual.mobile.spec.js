import forEach from 'mocha-each';

const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('f-footer - Mobile Visual Tests', () => {
    beforeEach(async () => {
        footer = new Footer();
    });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT'])
        .it('should display the base footer for tenant: "%s"', async tenant => {
            // Arrange
            await footer.withQuery('args', `locale:${tenant}`);

            // Act
            await footer.load();

            // Assert
            await browser.percyScreenshot(`f-footer - Base - ${tenant}`, 'mobile');
        });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT'])
        .it('should display the footer with country selector for tenant: "%s"', async tenant => {
            // Arrange
            await footer.withQuery('args', `locale:${tenant};showCountrySelector:true`);

            // Act
            await footer.load();

            // Assert
            await browser.percyScreenshot(`f-footer - Country Selector - ${tenant}`, 'mobile');
        });

    forEach(['en-AU', 'en-NZ'])
        .it('should display the footer with courier links for tenant: "%s"', async tenant => {
            // Arrange
            await footer.withQuery('args', `locale:${tenant};showCourierLinks:true`);

            // Act
            await footer.load();

            // Assert
            await browser.percyScreenshot(`f-footer - Courier Links - ${tenant}`, 'mobile');
        });

    forEach(['en-AU', 'en-NZ'])
        .it('should display the footer with courier links and country selector for tenant: "%s"', async tenant => {
            // Arrange
            await footer.withQuery('args', `locale:${tenant};showCountrySelector:true;showCourierLinks:true`);

            // Act
            await footer.load();

            // Assert
            await browser.percyScreenshot(`f-footer - Courier Links and Country Selector - ${tenant}`, 'mobile');
        });
});
