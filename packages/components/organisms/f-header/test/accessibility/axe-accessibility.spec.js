import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions.js');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');
const Header = require('../../test-utils/component-objects/f-header.component');

const header = new Header('organism', 'header-component');

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
    forEach(['gb', 'au', 'nz', 'ie', 'it', 'es', 'dk', 'no'])
    .it('a11y - should test f-header component WCAG compliance for "%s"', expectedLocale => {
        // Act
        header.withQuery('&knob-Locale', formatLocale(expectedLocale));
        header.withQuery('&knob-Show offers link', 'true');
        header.withQuery('&knob-Show delivery enquiry', 'true');
        const pageUrl = buildUrl(header.componentType, header.componentName, header.path);
        header.open(pageUrl);
        header.waitForComponent();
        const axeResults = getAccessibilityTestResults('f-header');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
