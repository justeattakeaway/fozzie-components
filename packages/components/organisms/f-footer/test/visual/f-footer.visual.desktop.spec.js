import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('f-footer - Desktop Visual Tests', () => {
    beforeEach(() => {
        footer = new Footer();
    });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT'])
        .it('should display the base footer for tenant: "%s"', tenant => {

            // Arrange
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            footer.open(pageUrl);
            footer.waitForComponent();
            browser.percyScreenshot(`f-footer - Base - ${tenant}`, 'desktop')
        });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'es-ES', 'it-IT'])
        .it('should display the footer with country selector for tenant: "%s"', tenant => {

            // Arrange
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'true');
            footer.withQuery('&knob-Show courier links', 'false');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            footer.open(pageUrl);
            footer.waitForComponent();
            browser.percyScreenshot(`f-footer - Country Selector - ${tenant}`, 'desktop')
        });

    forEach(['en-AU', 'en-NZ'])
        .it('should display the footer with courier links for tenant: "%s"', tenant => {

            // Arrange
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'false');
            footer.withQuery('&knob-Show courier links', 'true');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            footer.open(pageUrl);
            footer.waitForComponent();
            browser.percyScreenshot(`f-footer - Courier Links - ${tenant}`, 'desktop')
        });

    forEach(['en-AU', 'en-NZ'])
        .it('should display the footer with courier links and country selector for tenant: "%s"', tenant => {

            // Arrange
            footer.withQuery('&knob-Locale', tenant);
            footer.withQuery('&knob-Show country selector', 'true');
            footer.withQuery('&knob-Show courier links', 'true');
            const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

            footer.open(pageUrl);
            footer.waitForComponent();
            browser.percyScreenshot(`f-footer - Courier Links and Country Selector - ${tenant}`, 'desktop')
        });
});
