const { buildUrl } = require('@justeat/f-wdio-utils/src/storybook-extensions');
const Card = require('../../test-utils/component-objects/f-card.component');

const card = new Card('atom', 'card-component');

describe('f-card component tests', () => {
    beforeEach(() => {
        const pageUrl = buildUrl(card.componentType, card.componentName, card.path);
        card.open(pageUrl);
        card.waitForComponent();
    });

    it('should display the f-card component', () => {
        // Assert
        expect(card.isComponentDisplayed()).toBe(true);
    });
});
