import ActionButton from '../../test-utils/component-objects/f-button--action.component';
import LinkButton from '../../test-utils/component-objects/f-button--link.component';
import IconButton from '../../test-utils/component-objects/f-button--icon.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-button action component WCAG compliance', async () => {
        // Act
        await ActionButton.load();
        const axeResults = await ActionButton.getAxeResults('f-button - action');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button link component WCAG compliance', async () => {
        // Act
        await LinkButton.load();
        const axeResults = await LinkButton.getAxeResults('f-button - link');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });

    it('a11y - should test f-button icon component WCAG compliance', async () => {
        // Act
        await IconButton.load();
        const axeResults = await IconButton.getAxeResults('f-button - icon');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
