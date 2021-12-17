import { getAccessibilityTestResults } from '../../../../../../test/utils/axe-helper';

const ImageTile = require('../../test-utils/component-objects/f-image-tile.component');

const imageTile = new ImageTile();

describe('Accessibility tests', () => {
    beforeEach(() => {
        imageTile.load();
    });
    it('a11y - should test f-image-tile component WCAG compliance', () => {
        // Act
        const axeResults = getAccessibilityTestResults('f-image-tile');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
