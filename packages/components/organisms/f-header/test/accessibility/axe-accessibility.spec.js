import forEach from 'mocha-each';

const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');
const Header = require('../../test-utils/component-objects/f-header.component');

const header = new Header('organism', 'header-component');

describe('Accessibility tests', () => {
    forEach(['en-GB', 'en-AU', 'en-NZ', 'en-IE', 'it-IT', 'es-ES', 'da-DK', 'nb-NO'])
        .it('a11y - should test f-header component WCAG compliance for "%s"', tenant => {
            // Act
            header.withQuery('&knob-Locale', tenant);
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
