const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const MediaElement = require('../../test-utils/component-objects/f-media-element.component');

const mediaElement = new MediaElement();

describe('Accessibility tests', () => {
    beforeEach(() => {
        mediaElement.load();
    });

    it('a11y - should test f-media-element component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-media-element');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
