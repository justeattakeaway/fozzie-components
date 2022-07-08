import MediaElement from '../../test-utils/component-objects/f-media-element.component';

describe('Accessibility tests', () => {
    it('a11y - should test f-media-element component WCAG compliance', async () => {
        // Act
        await MediaElement.load();
        const axeResults = await MediaElement.getAxeResults('f-media-element');

        // Assert
        expect(axeResults.violations.length).toBe(0);
    });
});
