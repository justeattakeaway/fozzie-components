import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');
const Footer = require('../../test-utils/component-objects/f-footer.component');

let footer;

describe('Accessibility tests', () => {
    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ', 'da-DK', 'es-ES', 'it-IT', 'nb-NO'])
    .it('a11y - should test f-footer component WCAG compliance for country code "%s" with default options selected', tenant => {
        footer = new Footer('organism', 'footer-component');
        footer.withQuery('&knob-Locale', tenant);
        footer.withQuery('&knob-Show country selector', 'false');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-footer');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    forEach(['en-GB', 'en-AU', 'en-IE', 'en-NZ'])
    .it('a11y - should test f-footer component WCAG compliance for country code "%s" with extra options selected', tenant => {
        footer = new Footer('organism', 'footer-component');
        footer.withQuery('&knob-Locale', tenant);
        footer.withQuery('&knob-Show country selector', 'true');
        footer.withQuery('&knob-Show courier links', 'false');
        const pageUrl = buildUrl(footer.componentType, footer.componentName, footer.path);

        // Act
        footer.open(pageUrl);
        footer.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-footer');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
