const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

const MediaElement = require('../../test-utils/component-objects/f-media-element.component');

let mediaElement;

describe('Accessibility tests', () => {
    beforeEach(() => {
        mediaElement = new MediaElement();
    });

    it('a11y - should test f-media-element component WCAG compliance', () => {
        // Act
        mediaElement.load();
        const axeResults = getAxeResults('f-media-element');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
