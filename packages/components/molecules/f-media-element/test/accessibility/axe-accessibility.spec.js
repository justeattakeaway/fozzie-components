const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const { getAccessibilityTestResults } = require('../../../../../../test/utils/axe-helper');

const MediaElement = require('../../test-utils/component-objects/f-mediaElement.component');

const mediaElement = new MediaElement();

describe('Accessibility tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(mediaElement.componentType, mediaElement.componentName, mediaElement.path);
        mediaElement.open(pageUrl);
        mediaElement.waitForComponent();
    });
    it('a11y - should test f-mediaElement component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-mediaElement');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
