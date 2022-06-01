import { getAxeResults } from '../../../../../../test/utils/axe-helper'; // eslint-disable-line import/no-relative-packages

const ImageTile = require('../../test-utils/component-objects/f-image-tile.component');

const imageTile = new ImageTile();

describe('Accessibility tests', () => {
    beforeEach(() => {
        imageTile.load(imageTile.component);
    });
    it('a11y - should test f-image-tile component WCAG compliance', () => {
        // Act
        const axeResults = getAxeResults('f-image-tile');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
