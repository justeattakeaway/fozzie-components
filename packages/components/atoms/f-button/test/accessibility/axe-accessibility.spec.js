import ActionButton from '../../test-utils/component-objects/f-button--action.component';
import LinkButton from '../../test-utils/component-objects/f-button--link.component';
import IconButton from '../../test-utils/component-objects/f-button--icon.component';

const { getAxeResults } = require('../../../../../../test/utils/axe-helper');

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', () => {
        // Act
        ActionButton.load();
        const axeResults = getAxeResults('f-button - action');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', () => {
        // Act
        LinkButton.load();
        const axeResults = getAxeResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button icon component WCAG compliance', () => {
        // Act
        IconButton.load();
        const axeResults = getAxeResults('f-button - icon');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
