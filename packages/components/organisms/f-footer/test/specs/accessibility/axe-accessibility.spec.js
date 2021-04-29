const forEach = require('mocha-each');

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../../test/utils/axe-helper');
const Footer = require('../../../test-utils/component-objects/f-footer.component');

let footer;

function formatLocale (tenant) {
    const countryFormatted = tenant.toUpperCase();
    let formattedLocale = '';
    switch (countryFormatted) {
        case 'GB':
        case 'AU':
        case 'NZ':
        case 'IE':
            formattedLocale = `en-${countryFormatted}`;
            break;
        case 'DK':
            formattedLocale = `da-${countryFormatted}`;
            break;
        case 'ES':
            formattedLocale = `es-${countryFormatted}`;
            break;
        case 'IT':
            formattedLocale = `it-${countryFormatted}`;
            break;
        case 'NO':
            formattedLocale = `nb-${countryFormatted}`;
            break;
        default:
            throw new Error(`locale ${countryFormatted} is not supported`);
    }
    return formattedLocale;
}

describe('Accessibility tests', () => {
    forEach(['gb', 'au', 'ie', 'nz', 'dk', 'es', 'it', 'no'])
    .it('a11y - should test f-footer component WCAG compliance with default options selected', expectedLocale => {
        footer = new Footer('organism', 'footer-component');
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
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

    forEach(['gb', 'au', 'ie', 'nz'])
    .it('a11y - should test f-footer component WCAG compliance with extra options selected', expectedLocale => {
        footer = new Footer('organism', 'footer-component');
        footer.withQuery('&knob-Locale', formatLocale(expectedLocale));
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
